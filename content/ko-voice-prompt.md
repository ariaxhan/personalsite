# Gemini prompt: Korean site copy revision (ariaxhan.com)

You are revising the Korean copy for ariaxhan.com, the personal site of Aria Han, an AI systems
consultant in Los Angeles. The file is `app/utils/siteCopy.ko.ts`. English source of truth:
`app/utils/siteCopy.ts` (same keys).

## Task

Rewrite every Korean string in `siteCopy.ko.ts` to match the voice below. Do NOT translate
literally. For each string, understand what the English says and why it is there, then write the
Korean a professional Korean founder would put on their own site.

Absolute paths: `/Users/slowember/Developer/Vaults/CodingVault/personalsite/app/utils/siteCopy.ko.ts`
and `.../personalsite/app/utils/siteCopy.ts`. Work in that repo, not the current directory.

**Do not change `about.narrative`, `about.pulls`, `about.narrative2`, or `now`.**
 That text is approved by
Aria and is the voice reference. Everything else is yours, including `about.title` and
`about.subtitle`.

## Audience

1. Potential clients: founders, operators, company teams deciding whether to hire Aria.
2. AI engineers checking whether she is credible.
3. Professionals who know little about AI and want to understand what she does.

It must be accessible to #3 while clearly authoritative to #2.

## Voice (extracted from the approved about text)

- **Register: 합니다체.** 입니다 / 합니다 / 습니다. Never 해요체 (요 endings). The current draft ends
  nearly every sentence in 요; that reads childish or like a lesson for kids. Remove all of it.
  Exception: short UI labels, buttons, and fragments stay as noun phrases (소개, 문의하기, 글 전체).
- **Business-professional, calm, confident.** A founder introducing their practice. No cuteness,
  no teacher tone, no hype, no exclamation.
- **Structure first, then point.** Each paragraph: context, then a clear claim. Example:
  "그 과정에서 한 가지가 분명해졌습니다. ..."
- **Concrete lists of real work.** "사람이 반복해서 해야 하는 일, 정보가 흩어져 있어 판단이 느려지는 일,
  AI를 도입했지만 실제 업무에서는 제대로 작동하지 않는 일."
- **Frame by problem and outcome, not by tool.** "메모리, 에이전트, 평가 시스템, 워크플로우는 모두
  수단입니다." The question is always what the person should do, what AI should do, and how the two
  connect reliably inside real work.
- **Measured claims.** "새로운 모델과 도구를 빠르게 적용하는 것 자체가 목표는 아닙니다." State what is
  not the goal, then what is.
- **Brevity.** Cut filler, preamble, and narrative throat-clearing. Who she is, why AI, what problem
  she solves, fast. Shorter than the English when possible.

## Word choices

- Standard terms Korean professionals use: 워크플로우, 에이전트, 평가 시스템, 메모리, AI 제품,
  오픈소스, 컴퓨터과학, 스토리, 빌더.
- 오픈소스, not 공개된 일. Keep product and proper names in English (KERNEL, Claude Code, ModelMind,
  Paper Rooms, llm-bench).
- Write "AI" in capitals.
- Aria's English wit and metaphors (rabbit holes, "trophies vs chapters", "tabs ate my life",
  "flattening the work") do NOT survive translation. Replace with the plain professional meaning.
  If a line is only a joke, write the point, or make it very short.

## Examples of what to fix

| Current (wrong) | Problem | Direction |
|---|---|---|
| 안녕하세요, Aria예요 | 해요체, casual | 한 줄 소개, 합니다체 or noun phrase |
| 웹사이트는 끝난 것처럼 보여도 기계가 봐야 할 층은 조용히 깨지죠 | 요 ending, literal metaphor | plain statement of the problem |
| 그래서 Claude Code가 매번 처음부터 시작해서 기억과 규칙과 영수증을 둘러쌌어요 | literal, meaningless in Korean | state what KERNEL does and why |
| 리더보드가 제 질문에 답하지 않아서 답하는 테스트를 만들었어요 | childish | 기존 벤치마크가 실제 업무 성능을 보여주지 못해 ... 직접 만들었습니다 |
| 프로젝트는 트로피가 아니라 장이에요 | untranslatable wit | professional meaning |
| 공개된 일로는 | awkward | 오픈소스로는 |

Headline hook (approved direction from Aria's review): **"AI가 필요해서, AI와 함께 일하기까지."**
Use that shape wherever the English hero says "from we need AI to AI is working".

## Hard rules

- Edit `app/utils/siteCopy.ko.ts` only. Keep every key, type, array length, and object shape
  identical; only string values change. Do not touch URLs, paths, hrefs, numbers, commit counts,
  dates, or code identifiers.
- Do not invent facts, clients, or numbers not in the English source.
- Agent/markdown strings (llms, well-known, "마크다운" hints) stay accurate and plain.
- Use only file read and edit tools. Do not run shell commands; typechecking is done separately.
- Keep every string on one line; never insert a raw newline inside a quoted string.

- Report: count of strings changed, any string you were unsure about, and why.
