#!/usr/bin/env python3
"""Requirement-to-test traceability checker (not source-code line coverage)."""
import argparse
import json
import sys
from pathlib import Path


def check(data):
    requirements = data.get("requirements", [])
    cases = data.get("test_cases", [])
    issues = []
    req_ids = [r.get("id") for r in requirements]
    case_ids = [c.get("id") for c in cases]
    for kind, ids in (("requirement", req_ids), ("test case", case_ids)):
        if any(not isinstance(i, str) or not i.strip() for i in ids):
            issues.append(f"Invalid or missing {kind} ID")
        if len(ids) != len(set(ids)):
            issues.append(f"Duplicate {kind} IDs")
    known = set(req_ids)
    covered = set()
    for c in cases:
        links = c.get("requirements", [])
        if not isinstance(links, list) or not links:
            issues.append(f"Test {c.get('id', '?')} has no requirement links")
            continue
        for link in links:
            if link not in known:
                issues.append(f"Test {c.get('id', '?')} references unknown requirement {link}")
            else:
                covered.add(link)
    uncovered = sorted(known - covered)
    required = [r.get("id") for r in requirements if r.get("required", True)]
    missing_required = sorted(set(required) - covered)
    percent = round(100 * len(covered) / len(known), 2) if known else None
    if not requirements:
        issues.append("No requirements provided; coverage cannot be calculated")
    if missing_required:
        issues.append("Required requirements without tests: " + ", ".join(missing_required))
    return {"metric": "requirement_traceability_coverage", "coverage_percent": percent,
            "requirements_total": len(known), "requirements_covered": len(covered),
            "test_cases_total": len(cases), "uncovered_requirements": uncovered,
            "issues": issues, "passed": not issues,
            "note": "Coverage is based on declared test-case links, not verified execution or code coverage."}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--manifest", default="coverage/manifest.json")
    p.add_argument("--output", default="coverage/report.json")
    args = p.parse_args()
    try:
        data = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
        if not isinstance(data, dict) or not isinstance(data.get("requirements"), list) or not isinstance(data.get("test_cases"), list):
            raise ValueError("Manifest must contain requirements and test_cases arrays")
        result = check(data)
    except (OSError, ValueError, TypeError) as exc:
        result = {"passed": False, "issues": [f"Invalid coverage manifest: {exc}"]}
    target = Path(args.output)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, indent=2))
    return 0 if result["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
