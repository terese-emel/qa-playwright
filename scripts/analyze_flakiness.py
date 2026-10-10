#!/usr/bin/env python3
"""Analyze historical JUnit XML outcomes without external dependencies."""
import argparse
import json
from collections import defaultdict
from pathlib import Path
import xml.etree.ElementTree as ET

def analyze(paths):
    history = defaultdict(list)
    errors = []
    for path in paths:
        try:
            root = ET.parse(path).getroot()
            cases = root.iter('testcase')
            seen = set()
            for case in cases:
                key = (case.get('classname', ''), case.get('name', ''))
                if not key[1] or key in seen:
                    continue
                seen.add(key)
                outcome = 'failed' if any(case.find(t) is not None for t in ('failure', 'error')) else ('skipped' if case.find('skipped') is not None else 'passed')
                history[key].append({'run': str(path), 'outcome': outcome})
        except (OSError, ET.ParseError) as exc:
            errors.append({'file': str(path), 'error': str(exc)})
    tests = []
    for (classname, name), observations in sorted(history.items()):
        passed = sum(o['outcome'] == 'passed' for o in observations)
        failed = sum(o['outcome'] == 'failed' for o in observations)
        skipped = sum(o['outcome'] == 'skipped' for o in observations)
        tests.append({'id': f'{classname}::{name}', 'passed': passed, 'failed': failed, 'skipped': skipped,
                      'observed_flaky': passed > 0 and failed > 0,
                      'failure_rate': round(failed / (passed + failed), 4) if passed + failed else None,
                      'observations': observations})
    return {'tests': tests, 'observed_flaky_count': sum(t['observed_flaky'] for t in tests), 'errors': errors,
            'note': 'Pass/fail mixtures are signals, not proof of nondeterminism; compare same-code runs and environments before diagnosing.'}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('reports', nargs='+', help='JUnit XML files or directories (searched recursively)')
    parser.add_argument('--output', default='flaky-report.json')
    args = parser.parse_args()
    paths = sorted(set(p for arg in args.reports for p in ([Path(arg)] if Path(arg).is_file() else Path(arg).rglob('*.xml'))))
    result = analyze(paths)
    Path(args.output).write_text(json.dumps(result, indent=2) + '\n')
    print(f"Analyzed {len(paths)} reports, {len(result['tests'])} tests; observed intermittent outcomes: {result['observed_flaky_count']}; parse errors: {len(result['errors'])}")
    return 2 if result['errors'] else 0

if __name__ == '__main__':
    raise SystemExit(main())
