#!/usr/bin/env bash
set -euo pipefail

demo_dir="${1:-${TMPDIR:-/tmp}/qa-demo-app}"
demo_ref="009b7a5b9db78488b014e689258840a6a7d7741f"

if [ -e "$demo_dir" ] && [ ! -d "$demo_dir/.git" ]; then
  echo "Demo directory exists but is not a Git checkout: $demo_dir" >&2
  exit 1
fi
if [ ! -d "$demo_dir/.git" ]; then git clone https://github.com/saucelabs/sample-app-web.git "$demo_dir"; fi
git -C "$demo_dir" fetch --depth 1 origin "$demo_ref"
git -C "$demo_dir" checkout --detach "$demo_ref"
npm --prefix "$demo_dir" install --no-audit --no-fund
npm --prefix "$demo_dir" run start >"${RUNNER_TEMP:-/tmp}/sample-app-web.log" 2>&1 &
for attempt in {1..30}; do
  if curl --fail --silent http://127.0.0.1:3000/ >/dev/null; then exit 0; fi
  sleep 2
done
echo "The sample application did not start. Log: ${RUNNER_TEMP:-/tmp}/sample-app-web.log" >&2
cat "${RUNNER_TEMP:-/tmp}/sample-app-web.log" >&2 || true
exit 1
