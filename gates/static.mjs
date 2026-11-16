/**
 * Static gate runner — gates 2, 4, and 7.
 * Called by hooks/gates.mjs after each test file write.
 */

// Gate 2: 12 Playwright static rules
const PLAYWRIGHT_RULES = [
  { name: 'no-force-click', test: c => !/\.click\(.*force.*true/.test(c), msg: 'No force:true clicks' },
  { name: 'no-sleep', test: c => !/page\.waitForTimeout|setTimeout/.test(c), msg: 'No sleep/waitForTimeout' },
  { name: 'uses-await', test: c => /await/.test(c), msg: 'Must use await' },
  { name: 'no-page-pause', test: c => !/page\.pause\(/.test(c), msg: 'No page.pause()' },
  { name: 'uses-expect', test: c => /expect\(/.test(c), msg: 'Must use expect()' },
  { name: 'no-eval', test: c => !/page\.evaluate\(.*=>/.test(c), msg: 'Avoid page.evaluate with arrow functions' },
  { name: 'has-test-block', test: c => /test\(/.test(c), msg: 'Must have test() block' },
  { name: 'uses-locator', test: c => /locator\(|getBy/.test(c), msg: 'Must use locator or getBy*' },
  { name: 'no-xpath-only', test: c => !/locator\('xpath=/.test(c), msg: 'Avoid XPath-only locators' },
  { name: 'no-fixed-timeout', test: c => !/timeout:\s*\d{5,}/.test(c), msg: 'No hardcoded timeouts >= 10s' },
  { name: 'has-import', test: c => /import.*playwright|import.*test/.test(c), msg: 'Must import from playwright' },
  { name: 'no-console-log', test: c => !/console\.log/.test(c), msg: 'No console.log in tests' },
];

// Gate 4: no secret leak
function checkNoSecretLeak(content) {
  const SECRET_PATTERNS = [
    /password\s*=\s*['"`][^'"`]{4,}/i,
    /api[_-]?key\s*=\s*['"`][^'"`]{8,}/i,
    /token\s*=\s*['"`][^'"`]{16,}/i,
    /secret\s*=\s*['"`][^'"`]{8,}/i,
    /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/,
  ];
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      return { pass: false, msg: `Potential secret found matching ${pattern}` };
    }
  }
  return { pass: true, msg: 'No secrets detected' };
}

// Gate 7: assertions covered
function checkAssertCovered(content) {
  const assertCount = (content.match(/expect\(/g) || []).length;
  if (assertCount === 0) {
    return { pass: false, msg: 'No assertions found — expect() required' };
  }
  return { pass: true, msg: `${assertCount} assertion(s) found` };
}

export async function runStaticGates(content) {
  const results = [];

  // Gate 2: Playwright rules
  for (const rule of PLAYWRIGHT_RULES) {
    results.push({
      gate: 2,
      name: rule.name,
      pass: rule.test(content),
      msg: rule.msg,
    });
  }

  // Gate 4
  const g4 = checkNoSecretLeak(content);
  results.push({ gate: 4, name: 'no-secret-leak', pass: g4.pass, msg: g4.msg });

  // Gate 7
  const g7 = checkAssertCovered(content);
  results.push({ gate: 7, name: 'assert-covered', pass: g7.pass, msg: g7.msg });

  return results;
}
