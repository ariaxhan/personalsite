# nexus-office#1209: approved content hotfix

Scope: purge the banned project name from V2 and retained V1 source; keep the fifth win as Best Use of Wordware, GPT-4o vs. Gemini 1.5 Hackathon, 2024, with “Trigger agents with hotkeys.” and no link. Correct llm-bench to 42 tests and the-agent-library to 41 skills (40 active, 1 draft). Independent: “Taught non-technical founders Claude Code hands-on; reviewed their AI-generated applications.” Korean copy carries the same corrections.

Production source assumption: preserve the production layout from `13724d9`; do not deploy the held #1199 redesign or #1200 preview. `site-v2/scripts/build-hotfix-1209.mjs` reproduces this artifact using the approved content from main plus the corrected production timeline. The refresh-job hold is unchanged. No change to users claims, legal names, other hackathon details, or ZIP redesign.

Validation, 2026-11-22:

- Legacy `npm test`: 47 tests passed across 9 files.
- Nexus runner `python3.12 -m unittest discover -s runner/tests`: 84 tests passed. No runner source changed; no service restart required.
- Both main V2 and isolated production hotfix: Astro build passed.
- Regression: `shot:content` failed on old production because the fifth win had a link (1 instead of 0); the hotfix preview passed all 18 route/language/width combinations.
- Preview: https://56a9f8f8.ariaxhan-site-v2.pages.dev.
- Source search: zero banned-name matches in tracked text, including both forms; generated graph caches and binary asset filenames are not serving content.
- Preview PNGs: `/tmp/nexus-1209/preview-shots/`; browser receipt in `receipt.json`.

Production delivery and live evidence are recorded below after verification.
