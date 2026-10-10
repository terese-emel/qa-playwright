#!/usr/bin/env python3
"""Conservative synthetic-data policy scanner. Not a replacement for secret scanning."""
import argparse
import json
import re
from pathlib import Path

SCAN_DIRS = ('tests', 'test', 'fixtures', 'mocks', 'test-data', 'config')
EXTENSIONS = {'.js','.mjs','.cjs','.jsx','.ts','.tsx','.json','.yaml','.yml','.py','.java','.feature','.csv','.env'}
RULES = [
 ('private_key', re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----')),
 ('credential_assignment', re.compile(r'(?i)(?:password|passwd|api[_-]?key|access[_-]?token|secret[_-]?key)\s*[:=]\s*[^\s]{12,}')),
 ('github_token', re.compile(r'\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b')),
 ('aws_access_key', re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b')),
 ('bearer_token', re.compile(r'(?i)\bBearer\s+(?:eyJ[A-Za-z0-9_-]{16,}|[A-Za-z0-9_-]{32,})')),
 ('non_mock_email', re.compile(r'\b[A-Za-z0-9._%+-]+@(?!(?:example\.(?:com|org|net)|test\.invalid|localhost)\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', re.I)),
 ('production_url', re.compile(r'https?://(?!localhost\b|127\.0\.0\.1\b|0\.0\.0\.0\b|\[::1\]|example\.(?:com|org|net)\b|httpbin\.org\b|github\.com/test/|[^/\s]+\.(?:example|test|invalid)\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}', re.I)),
]

def scan(root):
    findings=[]
    for folder in SCAN_DIRS:
        base=root/folder
        if not base.is_dir(): continue
        for path in sorted(base.rglob('*')):
            if not path.is_file() or (path.suffix.lower() not in EXTENSIONS and path.name!='.env'): continue
            if path.stat().st_size>1_000_000: continue
            try: lines=path.read_text(encoding='utf-8').splitlines()
            except (UnicodeError,OSError): continue
            for number,line in enumerate(lines,1):
                for code,pattern in RULES:
                    if pattern.search(line):
                        findings.append({'file':str(path.relative_to(root)),'line':number,'rule':code})
    return findings

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--root',type=Path,default=Path('.'))
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    findings=scan(args.root.resolve())
    result={'status':'blocked' if findings else 'passed','findings':findings,'scanned_directories':list(SCAN_DIRS)}
    if args.output: args.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))
    raise SystemExit(1 if findings else 0)
