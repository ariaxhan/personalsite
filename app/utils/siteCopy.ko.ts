// ============================================================================
// SITE COPY · KO
// Korean parallel of siteCopy.ts. Same keys, types, slugs, URLs, and numbers
// so a locale toggle can swap this file in. Drafted in Korean, not translated.
// 합니다체. No em dashes. Technical terms stay English when that is Korean
// practice (LLM, API, JSON, token, Claude Code, MCP).
// ============================================================================

import type {
  Article,
  Book,
  ContactLink,
  DeskObject,
  Engagement,
  Hackathon,
  Moment,
  Project,
  ProofStat,
  Theme,
  Topic,
  WritingTheme,
} from "./siteCopy";

export type {
  Article,
  Book,
  ContactLink,
  DeskObject,
  Engagement,
  Hackathon,
  Moment,
  Project,
  ProjectLink,
  ProofStat,
  Theme,
  Topic,
  WritingTheme,
} from "./siteCopy";

// ---------------------------------------------------------------------------
// SITE META
// ---------------------------------------------------------------------------

export const SITE = {
  url: "https://ariaxhan.com",
  name: "Aria Han",
  /**
   * Positioning string. Korean buyers search "AI 컨설턴트", "AI 도입".
   * Keep it commercial, not a job-listing phrase.
   */
  role: "AI 컨설턴트",
  handle: "ariaxhan",
  location: "로스앤젤레스, 캘리포니아",
  email: "ariaxhan@gmail.com",

  services: [
    "AI 제품 구축 및 개선",
    "AI 프로젝트 리뷰",
    "실무 AI 워크플로우 설계 및 교육",
    "사내 AI 업무 자동화",
  ],

  oneLiner: "일을 위한 AI, 사람을 위한 AI.",

  strangeLine:
    "“AI가 필요해”에서 “AI와 함께 일한다”까지.",

  whatIDo:
    "기존 방식보다 분명히 나은 방법이 생겼을 때 검토하고, 실제 업무가 더 단순하고 빠르고 안정적으로 돌아가도록 적용합니다.",

  tldr:
    "Aria Han은 로스앤젤레스 기반의 AI 컨설턴트입니다. 창업자와 팀을 대상으로 AI 제품을 구축하거나 개선하고, 개인 및 조직의 업무에 맞는 AI 워크플로우와 내부 시스템을 설계합니다.",

  bio: [
    "로스앤젤레스에서 활동하는 AI 컨설턴트입니다. 창업자와 팀을 대상으로 AI 제품을 구축하거나 개선하고, 개인 및 조직의 업무에 맞는 AI 워크플로우와 내부 시스템을 설계합니다.",
    "창업자와 빌더에게는 AI 제품을 새로 구축하거나, AI 기반 개발 과정에서 중단된 프로젝트를 점검하고 개선하며, 리서치·작문·운영·의사결정을 위한 실무 워크플로우를 구축합니다. 대부분 작동하지만 디버깅, 확장, 신뢰도 확보가 어렵다면 프로젝트 리뷰를 통해 구조를 진단합니다. 워크플로우 교육과 직접 구축 모두 가능합니다.",
    "기업 고객과는 사내 운영 효율화에 집중합니다. 실제 업무 프로세스를 면밀히 분석하여 맥락이 단절되거나 반복 작업이 발생하는 지점을 찾고, 팀이 이미 사용하는 도구와 데이터 기반 위에 최적화된 AI 워크플로우를 구축합니다.",
    "컨설팅 이전에는 샌프란시스코에서 세 개의 AI 제품을 직접 구축하고 팀을 이끌었습니다. 앱스토어 출시 앱, Python 패키지, 오픈소스 평가 및 메모리 도구, 그리고 실제 저장소에서 코딩 에이전트를 구동하는 KERNEL 플러그인을 개발하여 공개했습니다.",
    "새로운 모델이나 도구를 빠르게 도입하는 것 자체에는 큰 의미를 두지 않습니다. 기존 방식보다 분명히 나은 방법이 생겼을 때 검토하고, 실제 업무가 더 단순하고 빠르고 안정적으로 돌아가도록 적용합니다.",
    "모든 작업과 글, 실패한 실험 기록까지 ariaxhan.com에 투명하게 공개하고 있습니다. 간단한 상담 및 프로젝트 리뷰는 언제든 환영합니다.",
  ],

  proof: {
    publicRepos: { value: "62", label: "공개 저장소", source: "api.github.com/users/ariaxhan", verified: "2026-07-06" },
    hackathonWins: { value: "5", label: "해커톤 우승", source: "Devpost and GitHub links on /hackathons; 5 wins, 1 finalist", verified: "2026-07-06" },
    liveProducts: { value: "3", label: "라이브 제품", source: "ModelMind + Paper Rooms (App Store), our4cuts (web)", verified: "2026-07-06" },
    substratePieces: { value: "7", label: "오픈소스 패키지", source: "open source packages on GitHub", verified: "2026-07-13" },
    portableSkills: { value: "39", label: "포터블 에이전트 스킬", source: "SKILL.md count, the-agent-library", verified: "2026-07-06" },
    benchmarkTests: { value: "21", label: "검증된 벤치마크 테스트", source: "llm-bench README", verified: "2026-07-06" },
  },

  socials: {
    github: "https://github.com/ariaxhan",
    medium: "https://medium.com/@ariaxhan",
    linkedin: "https://www.linkedin.com/in/ariahan/",
    x: "https://x.com/aria__han",
    pypi: "https://pypi.org/user/ariaxhan/",
    devpost: "https://devpost.com/ariaxhan",
    huggingface: "https://huggingface.co/ariaxhan",
  },

  booking: {
    url: "https://cal.com/aria-han/15min",
    line: "간단한 상담이나 프로젝트 리뷰는 언제든 가능합니다.",
  },
} as const;

export const proofStats: ProofStat[] = Object.values(SITE.proof);

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

export const THEME_LABELS: Record<Theme, string> = {
  memory: "메모리",
  context: "컨텍스트",
  evals: "평가 시스템",
  agents: "에이전트",
  coordination: "조율",
  verification: "검증",
  "local-first": "로컬 우선",
  implementation: "구현",
  "tiny-apps": "경량 앱",
};

export const projects: Project[] = [
  {
    slug: "modelmind",
    name: "ModelMind",
    kind: "product",
    status: "App Store 출시, 무료",
    thesis: "기존 AI 교육의 순서가 맞지 않다고 판단하여, 실무자에게 가장 먼저 필요한 직관 중심의 코스를 구축했습니다.",
    problem:
      "대부분의 AI 교육은 트랜스포머 이론부터 시작합니다. 하지만 실무자에게 먼저 필요한 것은 LLM과 효과적으로 대화하고, 더 나은 프롬프트를 작성하며, 모델의 실패에 대응할 수 있는 직관적인 이해입니다.",
    built: [
      "ModelMind는 AI를 어떻게 학습해야 하는가에 대한 해답입니다. 수백 일 이상 스트릭을 유지해 온 Duolingo의 학습 방식에서 영감을 받았습니다.",
      "매일 진행되는 게이미피케이션 연습을 통해 LLM의 핵심 개념을 학습하도록 설계했습니다. 모델 발전 과정에서 축적한 수천 시간의 상호작용 경험과 실무에서 지속적으로 검토한 연구 논문들을 바탕으로 콘텐츠를 구성했습니다.",
      "유료 결제나 광고 없이 완전 무료로 제공됩니다. 사용자가 모델의 구조를 명확히 이해하고 지속 가능한 멘탈 모델을 갖추도록 돕는 것이 목적입니다.",
    ],
    stack: "React Native · TypeScript · MMKV",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/modelmind/id6761348536" },
      { label: "model-mind.org", href: "https://model-mind.org" },
    ],
    proof: "iPhone, iPad, Mac용 App Store 정식 배포. 1인 개발 495 커밋 완료.",
    learned:
      "AI를 제대로 이해하기 위해 반드시 트랜스포머 수식부터 시작할 필요는 없습니다. 탄탄한 직관과 핵심을 찌르는 질문이 더 중요합니다.",
    proves:
      "교육적 목표를 정의하고 기획, 커리큘럼, 디자인, 멀티 플랫폼 개발, 배포 파이프라인까지 단독으로 완수한 역량을 증명합니다.",
    closing: "AI를 무작정 외우는 것이 아니라, 기술적 막연함을 해소하는 것이 목표입니다.",
    themes: ["implementation", "local-first", "tiny-apps"],
    connections: ["llm-bench", "model-familiarity-engine", "paper-rooms"],
    accent: "#b56a4f",
    meta: {
      role: "단독 개발 · 디자인 · 엔지니어링",
      status: "App Store 출시 · 무료",
      platform: "iPhone · iPad · Mac · Android",
      stack: "React Native · TypeScript · MMKV",
    },
    plate: "/studio/modelmind-icon.jpg",
    logo: "/studio/modelmind-icon.jpg",
    gallery: [
      "/studio/modelmind-1.jpg",
      "/studio/modelmind-3.jpg",
      "/studio/modelmind-2.jpg",
      "/studio/modelmind-4.jpg",
    ],
  },
  {
    slug: "paper-rooms",
    name: "Paper Rooms",
    kind: "product",
    status: "App Store 출시, 무료",
    thesis: "수많은 브라우저 탭에 파묻히는 연구 자료를 체계적으로 관리하기 위해 개인 라이브러리를 구축했습니다.",
    problem:
      "AI와 머신러닝 최신 논문을 매일 자동 수집하는 다이제스트를 운영하고 있습니다. 그러나 메일함의 PDF를 일일이 확인하고 브라우저 방문 기록에서 링크를 찾는 비효율이 누적되었습니다.",
    built: [
      "Paper Rooms는 링크를 입력받아 논문을 가독성 높은 형태로 재구성하고, 실제 도서관 분류 체계에 착안하여 체계적인 라이브러리로 정리합니다.",
      "PDF를 열어보거나 브라우저 탭을 뒤질 필요 없이, 논문을 효율적으로 읽고 보관할 수 있도록 설계했습니다.",
      "광고나 비용 청구 없이 완전 무료로 제공됩니다.",
    ],
    stack: "Capacitor · Local storage",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/paper-rooms/id6780741814" },
      { label: "paper-rooms.com", href: "https://paper-rooms.com" },
    ],
    proof: "iPhone, iPad, Mac용 App Store 배포. 1주일 이내 단독 개발 및 출시 완료.",
    learned:
      "매일 반복되는 사소한 불편을 확실하게 해결하는 도구가 가장 높은 사용 지속성을 보입니다.",
    proves: "로컬 저장소 기반 데이터 처리, 계정 없는 구조, 타이포그래피 최적화를 포함한 로컬 우선 제품 설계 역량을 증명합니다.",
    closing: "흩어진 브라우저 탭 대신 체계적인 연구 라이브러리를 만들고자 했습니다.",
    themes: ["local-first", "memory", "tiny-apps"],
    connections: ["metabrain", "modelmind"],
    accent: "#56695a",
    meta: {
      role: "단독 개발 · 디자인 · 엔지니어링",
      status: "App Store 출시 · 무료",
      platform: "iPhone · iPad · Mac",
      stack: "Capacitor · Local storage",
    },
    plate: "/studio/paperrooms-icon.jpg",
    logo: "/studio/paperrooms-icon.jpg",
    gallery: [
      "/studio/paperrooms-reader.jpg",
      "/studio/paperrooms-desk.jpg",
      "/studio/paperrooms-study.jpg",
      "/studio/paperrooms-search.jpg",
    ],
  },
  {
    slug: "our4cuts",
    name: "our4cuts",
    kind: "product",
    status: "운영 중",
    thesis: "별도의 전용 장비 없이 브라우저와 iPad만으로 즉석 포토부스를 구현했습니다.",
    problem:
      "이벤트용 포토부스는 통상 값비싼 하드웨어 대여가 필요하지만, 본질적으로는 카메라, 레이아웃 처리, 공유 갤러리 기능으로 모바일 브라우저에서도 충분히 구현 가능합니다.",
    built: [
      "QR 코드 스캔 시 브라우저에서 4컷 촬영을 진행하고, 모든 사진 스트립이 실시간 웹 갤러리에 동기화됩니다. 결혼식, 팝업 스토어, 매장 포토존 등에 최적화되어 있습니다.",
    ],
    stack: "Astro · Cloudflare",
    links: [{ label: "our4cuts.com", href: "https://our4cuts.com" }],
    proof: "실제 이벤트 현장 운영 중. 프로덕션 안정화 435 커밋 완료.",
    learned:
      "사용자에게 단순해 보이는 인터페이스일수록 브라우저별 카메라 API 파편화, 실시간 갤러리 동기화, 인쇄 레이아웃 등 복잡한 엣지 케이스 처리가 요구됩니다.",
    proves: "Cloudflare 기반의 소비자 대상 웹 제품을 처음부터 끝까지 개발하고 안정적으로 운영하는 역량을 보여줍니다.",
    closing: "QR 코드 하나로 공간 내 모든 스마트폰을 즉석 포토부스로 전환합니다.",
    themes: ["tiny-apps", "implementation"],
    connections: ["substrate", "paper-rooms"],
    accent: "#b08a4c",
    meta: {
      role: "제품 기획 · 웹 시스템 엔지니어링",
      status: "운영 중",
      platform: "Browser · QR · 이벤트 워크플로우",
      stack: "Astro · Cloudflare",
    },
    plate: "/studio/logo-our4cuts.svg",
    plateFit: "contain",
    logo: "/studio/logo-our4cuts.svg",
    gallery: ["/studio/our4cuts-home.png"],
  },

  {
    slug: "heycontext",
    name: "HeyContext",
    kind: "company",
    status: "프로덕션 배포, 2025–2026",
    thesis: "대화 맥락의 유실 문제를 해결하기 위해 영구 메모리 기반의 협업 워크스페이스를 구축했습니다.",
    problem:
      "단순 채팅 기반의 AI 활용은 비효율적이며 대화가 길어질수록 핵심 맥락이 소실되는 구조적 한계가 있었습니다.",
    built: [
      "단일 사용자 프롬프트로부터 상호 의존성을 갖는 에이전트 그룹을 동적으로 생성했습니다. 각 에이전트는 독립된 역할, 도구, 구조화된 아티팩트를 기반으로 작업하며, 직접 대화에 따른 토큰 낭비 없이 A2A 인수인계 노트를 통해 이전 학습 내용을 공유받습니다.",
      "자체 설계한 crystal dam 시스템을 통해 대화 컨텍스트가 임계치에 도달하면 이를 분해 및 정제하여 사용자가 직접 검토 가능한 메모리 아티팩트(stardust, shard, crystal)로 변환했습니다.",
    ],
    stack: "FastAPI · Redis · Convex · Agno · Next.js",
    links: [],
    proof: "출시 첫 달 마케팅 비용 없이 수백 명의 실사용자 확보.",
    learned:
      "새로운 시스템의 동작 원리를 명확한 개념과 용어로 정의하는 것이 복잡한 아키텍처의 설계와 검증을 용이하게 만듭니다.",
    proves:
      "메모리 관리, 라우팅, 에이전트 간 인수인계 프로토콜을 포함한 프로덕션 레벨 멀티 에이전트 시스템의 설계 및 운영 역량을 증명합니다.",
    closing: "독창적인 아키텍처 구조를 명확한 개념으로 정립하여 실제 동작하는 시스템으로 구현했습니다.",
    themes: ["agents", "coordination", "context", "memory"],
    connections: ["heycontent", "kernel", "the-agent-library"],
    accent: "#6f8696",
    meta: {
      role: "CEO · 리드 아키텍트 · 리드 엔지니어",
      timeline: "2025년 9월 – 2026년 1월",
      stack: "FastAPI · Redis · Convex · Agno · Next.js",
      status: "프로덕션 배포",
    },
    plate: "/studio/logo-heycontext.svg",
    logo: "/studio/logo-heycontext.svg",
    video: "/studio/demo-heycontext.mp4",
    poster: "/studio/demo-heycontext-poster.jpg",
  },
  {
    slug: "heycontent",
    name: "HeyContent",
    kind: "company",
    status: "HeyContext에 통합",
    thesis: "여러 플랫폼에 파편화된 크리에이터의 맥락을 단일 시스템으로 통합했습니다.",
    problem:
      "Instagram, YouTube, Gmail, 개인 메모가 분절되어 있어 크리에이터의 전체 작업물을 아우르는 분석 및 활용이 불가능했습니다.",
    built: [
      "해커톤 프로젝트 Content Creator Connector에서 출발하여 맥락 통합의 중요성을 실증했습니다. YouTube, Instagram, Gmail을 직접 연동하는 통합 플랫폼을 구축했습니다.",
      "대화형 온보딩을 통해 맞춤형 질문으로 크리에이터의 페르소나를 생성하고, 사용자가 이를 직접 검토 및 수정할 수 있게 했습니다. 이 페르소나는 실제 작성자의 톤앤매너가 반영된 스크립트와 콘텐츠를 생성하는 핵심 컨텍스트 레이어로 작동했습니다.",
    ],
    stack: "Embeddings · Semantic links · Real-time sync",
    links: [],
    proof: "5개 이상 플랫폼과의 실시간 데이터 동기화 구현. 설계된 메모리 레이어는 후속 제품으로 계승.",
    learned:
      "메모리 레이어의 성패는 사용자가 생성된 결과물에서 자신의 고유한 맥락을 확인할 수 있는가에 달려 있습니다.",
    proves: "스타트업 환경에서 이기종 플랫폼 간 데이터 파이프라인 구축 및 시맨틱 메모리 아키텍처 설계 역량을 증명합니다.",
    closing: "크리에이터 도구 개발을 통해 데이터 맥락의 통합이 AI 시스템의 핵심임을 확인했습니다.",
    themes: ["memory", "context", "implementation"],
    connections: ["heycontext", "metabrain"],
    accent: "#8a4b3a",
    meta: {
      role: "CEO · 리드 엔지니어",
      timeline: "2025년 3월 – 2025년 9월",
      integration: "5개 이상 플랫폼 · 실시간 동기화",
    },
    plate: "/studio/logo-heycontent.png",
    logo: "/studio/logo-heycontent.png",
    video: "/studio/demo-heycontent.mp4",
    poster: "/studio/demo-heycontent-poster.jpg",
  },
  {
    slug: "brink-mind",
    name: "Brink Mind",
    kind: "company",
    status: "TestFlight 배포, 2024–2025",
    thesis: "신체 반응 데이터를 결합하여 보다 실질적인 멘탈 헬스 케어 솔루션을 제공하고자 했습니다.",
    problem:
      "기존 멘탈 헬스 앱들은 주관적 텍스트 기록에만 의존하며 심박수 및 심박변이도(HRV) 같은 신체 생체 신호를 반영하지 못했습니다.",
    built: [
      "Apple Watch와 연동하여 생체 데이터와 일기 기록을 결합함으로써 보다 정밀하고 안정적인 맞춤형 피드백을 제공했습니다. 초기 창업 단계에서 SwiftUI, UI/UX 설계, 온디바이스 모델 구현을 병행하며 개발했습니다.",
    ],
    stack: "Swift · Python · Core ML · HealthKit",
    links: [],
    proof: "음성 처리, 생체 신호 연동, 온디바이스 추론을 구현하여 TestFlight 단계까지 성공적으로 도달.",
    learned:
      "가파른 학습 곡선을 거치며 축적한 기술적 기반은 이후 에이전트 시스템 아키텍처를 설계하는 중요한 토대가 되었습니다.",
    proves: "네이티브 iOS 및 watchOS 엔지니어링 역량, 민감한 헬스케어 데이터의 온디바이스 처리 설계를 증명합니다.",
    closing: "직접 제품을 구축하면서 새로운 기술 영역을 신속하게 습득하고 검증했습니다.",
    themes: ["local-first", "implementation"],
    connections: ["paper-rooms", "modelmind"],
    accent: "#485a4d",
    meta: {
      role: "CEO · 리드 아키텍트 · SwiftUI 엔지니어",
      timeline: "2024년 11월 – 2025년 3월",
      platform: "iOS · watchOS · HealthKit",
    },
    plate: "/studio/logo-brinkmind.png",
    plateFit: "contain",
    logo: "/studio/logo-brinkmind.png",
    gallery: ["/studio/brink-landing.jpg", "/studio/brink-app-1.jpg", "/studio/brink-app-2.jpg"],
  },

  {
    slug: "site-spec",
    name: "site-spec",
    kind: "open-source",
    status: "진행 중, 감사 및 컴파일러 배포 완료",
    thesis: "웹사이트의 시각적 완성도와 별개로, 검색 엔진 및 AI 시스템이 요구하는 데이터 레이어의 결함을 진단합니다.",
    problem:
      "브라우저는 렌더링된 화면만 보여주지만, 검색 크롤러와 AI 답변 엔진은 robots 정책, 구조화 데이터, 응답 헤더, 접근성 시맨틱, 사이트맵, 서버 렌더링 결과 등 보이지 않는 레이어에 의존합니다.",
    built: [
      "site-spec은 웹사이트의 보이지 않는 데이터 레이어를 정밀 감사합니다. 라이브 URL이나 로컬 빌드를 크롤링하여 실제 전달되는 페이지 및 HTTP 헤더를 분석하고, AI 검색성, SEO, 구조화 데이터, 접근성, 보안, 성능, 링크 무결성 전반의 구체적 오류를 보고합니다.",
      "결정론적 사이트 컴파일러를 포함하고 있어, 검증된 SiteSpec을 기계 판독 기반이 완비된 HTML로 직접 빌드함으로써 잘못된 마크업이나 환각 정보를 배제합니다.",
    ],
    stack: "TypeScript · Node.js · Vitest",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/site-spec" }],
    proof:
      "v0.2.0 배포: 라이브 URL 및 로컬 디렉터리 감사, JSON 출력, CI용 종료 코드, 결정론적 사이트 빌드 지원.",
    learned:
      "웹사이트의 보이지 않는 영역 역시 화면만큼 엄격한 테스트가 필요합니다. 요구사항을 명시적 스펙으로 관리할 때 안정적인 검증과 컴파일이 가능합니다.",
    proves:
      "웹 표준 규격을 바탕으로 기존 사이트를 검증하고 신규 사이트를 무결하게 빌드하는 결정론적 도구 개발 역량을 보여줍니다.",
    closing: "기계 판독 레이어까지 온전히 검증되어야 사이트가 완성된 것입니다.",
    themes: ["verification", "implementation"],
    connections: ["llm-bench", "substrate"],
    accent: "#4f7680",
    meta: {
      status: "진행 중 · v0.2.0",
      stack: "TypeScript · Node.js · Vitest",
      scope: "감사 · 빌드 · 인수인계",
      license: "Apache-2.0",
    },
    plate: "/studio/repo-site-spec.jpg",
    gallery: ["/studio/repo-site-spec.jpg"],
  },
  {
    slug: "kernel",
    name: "KERNEL",
    kind: "open-source",
    status: "진행 중, Claude 플러그인 마켓플레이스 배포",
    thesis: "매번 컨텍스트가 초기화되는 문제를 방지하기 위해 Claude Code에 영구 메모리, 검증 훅, 실행 규칙을 결합했습니다.",
    problem:
      "에이전트 세션은 매번 제로 베이스에서 시작되며 모범 사례는 구전에 의존합니다. 에이전트에게는 지속되는 메모리와 스스로 검증 가능한 명확한 규칙이 필요합니다.",
    built: [
      "KERNEL은 Claude Code에 영구 메모리, 결정론적 훅, 스킬 라이브러리, 워크플로우 실효성 검증 체계를 제공합니다. 전담 서브에이전트, SQLite 기반 워크플로우, 검증 게이트를 갖추고 있으며 Claude 플러그인 마켓플레이스를 통해 설치되어 Cursor 및 Codex와도 연동됩니다.",
    ],
    stack: "Claude Code · SQLite · Shell",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/kernel-claude" }],
    proof: "2026년 1월 이후 360 커밋 달성. 공식 플러그인 마켓플레이스 배포 및 실제 컨설팅 업무에 매일 사용 중.",
    learned:
      "환경 설정은 일종의 가설입니다. 자체 규칙을 실험하고 검증하는 엔진을 구축함으로써 명확한 증거 기반의 시스템 개발 방식을 확립했습니다.",
    proves:
      "훅 시스템, SQLite 기반 메모리, 멀티 에이전트 오케스트레이션, 실제 마켓플레이스 배포를 포괄하는 심층 에이전트 하네스 엔지니어링 역량을 증명합니다.",
    closing: "에이전트에게 필요한 것은 감이 아닌, 스스로 증명하는 메모리와 규칙입니다.",
    themes: ["memory", "agents", "verification", "coordination"],
    connections: ["metabrain", "the-agent-library", "llm-bench", "heycontext"],
    accent: "#b56a4f",
    meta: {
      status: "진행 중 · 플러그인 마켓플레이스",
      stack: "Claude Code · SQLite · Shell",
      methodology: "AgentDB · 계약 · 오케스트레이션",
    },
    plate: "/studio/repo-kernel.jpg",
    gallery: ["/studio/repo-kernel.jpg"],
  },
  {
    slug: "llm-bench",
    name: "llm-bench",
    kind: "open-source",
    status: "진행 중",
    thesis: "기존 리더보드가 실제 업무 성능을 보여주지 못해 실무 기반의 벤치마크 테스트를 직접 구축했습니다.",
    problem:
      "공개 리더보드는 실제 업무 환경에서 모델이 요구 성능을 유지할 수 있는지에 대한 핵심 질문에 답하지 못합니다.",
    built: [
      "데이터 추출, 코드 작성, 버그 수정, 이메일 작성, 프롬프트 인젝션 방어 등 실제 워크플로우 과제를 구성하고 프로그래밍 방식의 검증기로 엄격히 채점합니다. Ollama, Apple Intelligence, Claude CLI, Bedrock, OpenAI 호환 엔드포인트 전반을 지원합니다.",
    ],
    stack: "Python · Ollama · Bedrock · Claude CLI",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/llm-bench" }],
    proof:
      "21개 테스트 세트, 프로그래밍 방식 검증기 구축, Opus 4.8 vs 4.7 vs Sonnet vs Haiku 비교 결과 공개. 148 커밋.",
    learned:
      "평가 척도가 객관적이어야 실질적인 벤치마크가 성립합니다. 코드 기반 검증기는 LLM-as-judge 방식의 모호함을 배제하고 엄격한 신뢰성을 보장합니다.",
    proves: "클라이언트 평가 시스템 설계 및 모니터링 구축에 직결되는 기술 역량을 입증합니다.",
    closing: "평가 기준이 명확하고 반증 가능해야 진정한 벤치마크입니다.",
    themes: ["evals", "verification"],
    connections: ["model-familiarity-engine", "latent-diagnostics", "kernel"],
    accent: "#6f8696",
    meta: {
      status: "진행 중 · 실무 워크플로우 벤치마크",
      stack: "Python · Ollama · Bedrock · Claude CLI",
      scope: "표준 · 고난도 · 에이전틱 · 적대적 공격 · 비정형",
      license: "MIT",
    },
    plate: "/studio/repo-llm-bench.jpg",
    gallery: ["/studio/repo-llm-bench.jpg"],
  },
  {
    slug: "the-agent-library",
    name: "the-agent-library",
    kind: "open-source",
    status: "진행 중",
    thesis: "단편적인 프롬프트 모음의 한계를 넘어, 반복되는 워크플로우를 이식 가능한 에이전트 스킬로 체계화했습니다.",
    problem:
      "정적인 프롬프트 모음은 시스템 변화에 취약합니다. 실질적으로 유효한 단위는 트리거, 실행 단계, 완료 조건이 정의되어 모든 에이전트가 호출 가능한 구조화된 워크플로우입니다.",
    built: [
      "AI 에이전트로부터 실질적인 결과물을 도출하기 위한 포터블 스킬 라이브러리입니다. Claude, Codex 등 스킬 파일을 해석할 수 있는 에이전트 환경에 적용됩니다. 코드 엔지니어링뿐만 아니라 자체 검토, 기획, 아이디어 도출, 리서치, 테크니컬 라이팅, 릴리스 등 실무 전반을 포괄합니다.",
      "각 스킬은 명확한 트리거와 표준화된 SKILL.md 규격으로 구성되어 있으며, 수개월간의 실무 검증을 거친 패턴들로 지속 업데이트됩니다.",
    ],
    stack: "Claude · Codex · Agent Skills",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/the-agent-library" }],
    proof: "실무에서 직접 추출한 39개 스킬 수록. MIT 라이선스.",
    learned:
      "실무 과정에서 반복되는 패턴을 포착하여 문서화할 때 비로소 재사용 가능한 프레임워크가 완성됩니다.",
    proves:
      "현장의 복잡한 작업을 재사용 가능하고 표준화된 프로세스로 정립하는 역량을 보여주며, 이는 기업 AI 도입의 핵심 과제입니다.",
    closing: "단순 프롬프트 모음이 아닌, 복사하여 즉시 실행하고 신뢰할 수 있는 워크플로우가 핵심입니다.",
    themes: ["agents", "implementation", "coordination"],
    connections: ["kernel", "heycontext"],
    accent: "#56695a",
    meta: {
      status: "진행 중 · 포터블 스킬 39개",
      stack: "Claude · Codex · Agent Skills",
      structure: "카테고리별 라이브러리",
      license: "MIT",
    },
    plate: "/studio/repo-agent-library.jpg",
    gallery: ["/studio/repo-agent-library.jpg"],
  },
  {
    slug: "model-familiarity-engine",
    name: "model-familiarity-engine",
    kind: "open-source",
    status: "부트스트랩 루프 배포 완료",
    thesis: "단순 순위 비교를 넘어, 실제 업무 관계 속에서 모델이 축적한 성능 데이터를 파악하고자 했습니다.",
    problem:
      "단발성 벤치마크는 실제 장기 협업 환경에서 모델이 어떻게 작동하는지를 충분히 반영하지 못합니다.",
    built: [
      "실제 대화 데이터를 시뮬레이션하여 언어 모델의 성능을 평가하고, 단순 랭킹이 아닌 관찰된 행동 데이터에 근거한 모델 카드를 생성합니다. 모든 평가는 실제 대화 트랜스크립트 기반으로 이루어집니다.",
      "결과가 검증된 과제에 대한 비식별화, 리플레이, 실측 기반 모델 카드 생성을 포괄하는 리플레이 부트스트랩 루프를 구현했습니다.",
    ],
    stack: "Python · Bedrock · Ollama · Claude CLI",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/model-familiarity-engine" }],
    proof: "리플레이 부트스트랩 루프 배포 완료. 비식별화, 리플레이, 실측 모델 카드 생성 지원. MIT 라이선스.",
    learned:
      "비식별화된 실제 대화 기록을 리플레이함으로써 인위적인 합성 데이터 없이도 실효성 있는 평가 체계를 구축할 수 있습니다.",
    proves: "새로운 평가 방법론을 설계하고 개념에 머물지 않고 실제 실행 루프까지 완성하여 배포한 역량을 증명합니다.",
    closing: "어떤 모델이 최고인가가 아니라, 해당 모델이 실제 업무에서 무엇을 검증받았는가가 핵심입니다.",
    themes: ["evals", "memory", "verification"],
    connections: ["llm-bench", "kernel"],
    accent: "#b08a4c",
    meta: {
      status: "부트스트랩 루프 배포 완료",
      stack: "Python · Bedrock · Ollama · Claude CLI",
      scope: "리플레이 · 비식별화 · 모델 카드",
      license: "MIT",
    },
    plate: "/studio/repo-model-familiarity.jpg",
    gallery: ["/studio/repo-model-familiarity.jpg"],
  },
  {
    slug: "metabrain",
    name: "metabrain",
    kind: "open-source",
    status: "PyPI 배포 완료",
    thesis: "지속적인 검증 게이트가 없는 메모리 저장은 단순한 노이즈로 전락합니다.",
    problem:
      "대부분의 메모리 도구는 정보를 저장하기만 할 뿐 스스로 학습하지 않습니다. 검증 및 승격 단계가 없는 저장은 정보의 질을 떨어뜨립니다.",
    built: [
      "외부 의존성 없는 SQLite 레이어를 기반으로 피드백 루프를 완성했습니다. 반복 패턴이 가설로 승격되고, 실행 결과를 통해 검증된 정보만 최종 선호 데이터로 채택됩니다.",
    ],
    stack: "Python · SQLite · Zero-dependency",
    links: [
      { label: "GitHub", href: "https://github.com/ariaxhan/metabrain" },
      { label: "PyPI", href: "https://pypi.org/project/metabrain/" },
    ],
    proof: "PyPI 공식 배포 완료: pip install metabrain. 의존성 제로 아키텍처 설계.",
    learned:
      "패턴 관찰, 가설 수립, 검증된 선호 채택으로 이어지는 승격 루프는 관찰·제안·검증을 거치는 전문 컨설팅의 방법론과 정확히 일치합니다.",
    proves: "품질 관리 게이트가 내장된 지식 시스템을 설계하고 패키지화하여 배포하는 역량을 증명합니다.",
    closing: "메모리가 시스템의 규칙으로 승격되기 전에 먼저 실효성을 증명해야 합니다.",
    themes: ["memory", "verification", "local-first"],
    connections: ["kernel", "paper-rooms", "heycontent"],
    accent: "#8a4b3a",
    meta: {
      status: "배포 완료 · PyPI + GitHub",
      stack: "Python · SQLite · 의존성 제로",
      install: "pip install metabrain",
      license: "MIT",
    },
    plate: "/studio/repo-metabrain.jpg",
    gallery: ["/studio/repo-metabrain.jpg"],
  },
  {
    slug: "agentmailkit",
    name: "agentmailkit",
    kind: "open-source",
    status: "PyPI 배포 완료, MIT",
    thesis: "모델이 본문을 작성하더라도, 예약 발송 메일의 구조와 레이아웃은 매일 결정론적으로 일관되어야 합니다.",
    problem:
      "클라우드 비서는 메일 예약이 가능하지만 로컬 파일에 접근하거나 개인 메일함으로 발송하지 못합니다. 로컬 에이전트는 둘 다 가능하지만 매번 출력 레이아웃이 달라져 업무적 신뢰도를 잃기 쉽습니다.",
    built: [
      "단일 메일을 JSON 작업 정의와 마크다운 프롬프트라는 두 개의 파일로 분리했습니다. 유형별 차이는 독립된 플러그인으로 처리하여 코드 수정 없이 데이터 추가만으로 새 다이제스트를 확장할 수 있습니다.",
      "모델은 오직 문장 생성만 담당하고 결정론적 렌더러가 전체 레이아웃을 엄격하게 제어합니다. 동일한 작업은 매번 동일한 포맷을 생성하며 바뀌는 것은 본문 내용뿐입니다.",
      "작업 ID와 URL 기반의 seen-ledger를 통해 프롬프트 생성 전 중복 소스를 필터링하고 실제 발송 성공 시에만 기록하여 중복 전송을 방지합니다.",
    ],
    stack: "Python · Append-only JSONL ledger · Zero required dependencies",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/agentmailkit/" },
      { label: "GitHub", href: "https://github.com/ariaxhan/agentmailkit" },
      { label: "샘플 메일", href: "https://ariaxhan.github.io/agentmailkit/" },
    ],
    proof:
      "5종의 예제 작업이 기본 탑재되어 설치 즉시 날씨, 뉴스, arXiv 피드 기반의 다이제스트를 생성합니다. 36개 단위 테스트, 오프라인 결정론적 검증 완료. 코드 레벨에서 드라이 런 및 퀵스타트 모드의 오발송을 원천 차단합니다.",
    learned:
      "콘텐츠와 레이아웃을 분리하는 것이 AI 출력의 일관성을 보장하는 핵심입니다. 결정론적 통제가 필수적인 기능이며, 무제한적 자율성은 오히려 오류를 유발합니다.",
    proves: "자체 검증된 개인 자동화 시스템을 타인이 설치하여 즉시 운용할 수 있는 독립 패키지로 고도화한 역량을 증명합니다.",
    closing: "모델은 문장만 작성하고, 나머지 시스템 제어는 엔진이 전담합니다.",
    themes: ["agents", "local-first", "implementation"],
    connections: ["kernel", "metabrain", "substrate"],
    accent: "#a97448",
    meta: {
      status: "배포 완료 · PyPI + GitHub",
      stack: "Python · 필수 의존성 제로",
      install: "pip install agentmailkit",
      license: "MIT",
    },
    plate: "/studio/repo-agentmailkit.svg",
    gallery: ["/studio/repo-agentmailkit.svg"],
  },
  {
    slug: "substrate",
    name: "Substrate",
    kind: "open-source",
    status: "운영 중, 425개 이상 작품 등록",
    thesis: "사람의 개입 없이 매일 작동하는 완전 자율 창작 파이프라인의 장기적인 결과물을 실험했습니다.",
    problem:
      "자율 생성 파이프라인이 1년 이상 지속 운영될 때 어떤 결과가 도출되는지 장기적으로 검증한 사례는 드뭅니다.",
    built: [
      "Claude Code 에이전트가 매일 자동으로 추상적이고 인터랙티브한 컴퓨터 아트를 생성하는 오픈 갤러리입니다. 각 작품은 평균 2KB 내외의 독립된 단일 HTML 파일로 구성됩니다.",
    ],
    stack: "HTML · CSS · JavaScript · Cloudflare Pages",
    links: [
      { label: "GitHub", href: "https://github.com/ariaxhan/substrate" },
      { label: "갤러리", href: "https://nexus-substrate.pages.dev" },
    ],
    proof: "425개 이상의 작품이 사람의 개입 없이 매일 자동 생성되어 공개 저장소에 누적 중.",
    learned:
      "명확한 제약 조건이 무인 파이프라인의 지속성을 보장합니다. 작품당 단일 파일 구조를 채택하여 시스템 장애 없이 장기 운영을 달성했습니다.",
    proves: "감독 없이 매일 안정적으로 가동되는 자동화 에이전트 파이프라인의 설계 및 장기 운영 역량을 입증합니다.",
    closing: "에이전트가 단순 대화를 넘어 실질적인 결과물을 자율적으로 창출하도록 설계한 시스템입니다.",
    themes: ["agents", "tiny-apps", "implementation"],
    connections: ["kernel", "our4cuts"],
    accent: "#5d7a86",
    meta: {
      status: "운영 중 · 작품 425+",
      stack: "HTML · CSS · JavaScript · Cloudflare Pages",
      cadence: "매일 에이전트 자동 생성",
      constraint: "독립 단일 파일 · 평균 약 2KB",
    },
    plate: "/studio/repo-substrate.jpg",
    gallery: ["/studio/repo-substrate.jpg"],
  },
  {
    slug: "latent-diagnostics",
    name: "latent-diagnostics",
    kind: "research",
    status: "연구 프로젝트, 부정적 결과(Negative Results) 보존",
    thesis: "단순히 출력 정답률만 측정하는 것을 넘어, 모델이 내부적으로 유의미한 연산을 수행했는지 검증하고자 했습니다.",
    problem:
      "최종 답변 채점 방식은 모델의 정답 여부만 알려줄 뿐, 내부 잠재 공간에서 실제로 계산이 일어났는지 여부는 밝히지 못합니다.",
    built: [
      "답변 채점을 넘어 어트리뷰션 그래프의 기하학적 구조를 분석합니다. 텍스트 길이를 통제한 상태에서도 과제 도메인별 실제 연산 서명이 확인되었습니다. 반면 환각 감지 가설은 동일한 엄격한 검증을 통과하지 못했으며, 연구 저장소는 이러한 부정적 결과 또한 가감 없이 문서화했습니다.",
    ],
    stack: "Python · SAEs · Attribution graphs",
    links: [{ label: "GitHub", href: "https://github.com/ariaxhan/latent-diagnostics" }],
    proof:
      "길이 통제 후 문법적 영향 계수 d=1.08 도출. 108 커밋. 검증에 실패한 가설을 입증된 가설과 함께 투명하게 기록.",
    learned:
      "실패한 연구 결과 역시 중요한 지적 자산입니다. 환각 감지 가설이 길이 통제를 견디지 못했다는 사실을 명확히 기록하여 연구적 신뢰도를 확보했습니다.",
    proves: "통계적 통제와 데이터 정직성을 기반으로 엄밀한 가설 검증을 수행하는 연구 방법론적 역량을 증명합니다.",
    closing: "단순히 정답을 내는 것과 실제 유의미한 연산을 거치는 것은 근본적으로 다릅니다.",
    themes: ["evals", "verification"],
    connections: ["llm-bench", "model-familiarity-engine"],
    accent: "#6a6470",
    meta: {
      status: "연구 · 실패 결과 보존",
      stack: "Python · SAEs · Attribution graphs",
      finding: "길이 통제 후 문법 영향 계수 d=1.08",
      license: "MIT",
    },
    plate: "/studio/repo-latent-diagnostics.jpg",
    gallery: ["/studio/repo-latent-diagnostics.jpg"],
  },
];

export const productProjects = projects.filter((p) => p.kind === "product" || p.kind === "company");
export const openSourceProjects = projects.filter(
  (p) => p.kind === "open-source" || p.kind === "research"
);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// STUDIO
// ---------------------------------------------------------------------------

export const deskObjects: DeskObject[] = [
  {
    kind: "notebook",
    label: "01 · 소개",
    caption: "Aria Han과 작업 철학",
    href: "/about",
    pos: { left: "6%", top: "16%" },
  },
  {
    kind: "sticky",
    label: "02 · 해커톤",
    caption: "압박 속에서 검증한 프로젝트",
    href: "/hackathons",
    pos: { left: "28%", top: "11%", rotate: -4 },
  },
  {
    kind: "blueprint",
    label: "03 · 시스템",
    caption: "구축된 프로덕트 및 시스템",
    href: "/systems",
    pos: { left: "51%", top: "14%", rotate: 3 },
  },
  {
    kind: "map",
    label: "04 · 오픈소스",
    caption: "공개 프로젝트 및 연구",
    href: "/open-source",
    pos: { right: "6%", top: "18%", rotate: -2 },
  },
  {
    kind: "books",
    label: "05 · 독서",
    caption: "최근 읽은 책과 생각",
    href: "/reading",
    pos: { left: "13%", top: "60%" },
  },
  {
    kind: "card",
    label: "06 · 연혁",
    caption: "연도별 주요 이력",
    href: "/timeline",
    pos: { left: "41%", top: "58%" },
  },
  {
    kind: "coffee",
    label: "07 · 문의",
    caption: "프로젝트 상담 및 문의",
    href: "/contact",
    pos: { right: "14%", top: "60%", rotate: 2 },
  },
];

export const books: Book[] = [
  {
    title: "The Nanotech Succession",
    author: "Linda Nagata",
    color: "#56695a",
    why: "1995년부터 1998년 사이에 집필된 작품이지만, 최근 출간된 서적처럼 현대적인 통찰을 제공합니다.",
    note: "AI, 인공 의식, 수백 년에 걸친 문명과 종의 역사를 다룹니다. 현재의 기술적 양상과 맞닿아 있으면서도 깊은 철학적 질문을 던집니다.",
  },
  {
    title: "시간 전쟁에서 패하는 법",
    author: "Amal El-Mohtar & Max Gladstone",
    color: "#485a4d",
    current: true,
    why: "개인적으로 가장 아끼는 작품 중 하나이며, 언어가 지닌 아름다움을 완벽하게 구현한 산문입니다.",
    note: "두 작가가 두 화자의 시선으로 시공간을 가로지르는 서사를 풀어냅니다. AI가 생성한 텍스트를 많이 접한 뒤, 정교하게 다듬어진 언어의 가치를 되새길 때 다시 읽게 됩니다.",
  },
  {
    title: "The Fall of Princes",
    author: "Robert Goolrick",
    color: "#6f8696",
    why: "자서전적 사실과 소설적 서사가 결합된 독특한 형태의 작품입니다.",
    note: "금융 위기 이전 월스트리트의 극단적인 부와 공허함을 생생하게 묘사합니다. 개인적인 삶의 영역과 매우 동떨어져 있어 오히려 흥미롭게 다가오며, 가감 없는 날것의 문장이 인상적입니다.",
  },
  {
    title: "Down the Drain",
    author: "Julia Fox",
    color: "#b56a4f",
    why: "회고록의 형식을 띤 솔직하고 거침없는 기록입니다.",
    note: "인물의 내면과 삶의 경험을 여과 없이 드러냅니다. 어떤 필터도 거치지 않은 극단적인 정직함이 독자를 몰입하게 만듭니다.",
  },
  {
    title: "커피가 식기 전에",
    author: "Toshikazu Kawaguchi",
    color: "#b08a4c",
    why: "커피가 식는 짧은 시간에 얽힌 절제되고 고요한 시간여행 서사입니다.",
    note: "담담하고 차분한 어조 속에 감정과 기억, 그리고 상실 이후 인간 관계의 의미를 깊이 있게 조명합니다.",
  },
  {
    title: "바벨",
    author: "R. F. Kuang",
    color: "#8a4b3a",
    current: true,
    why: "가장 존경하는 작가의 역작이며, 언어와 번역의 본질을 탐구합니다.",
    note: "두 언어 사이의 의미 차이에서 발생하는 긴장과 마법을 다룹니다. 시스템을 지탱하는 번역가들의 역할과 언어 자체에 바치는 오마주입니다.",
  },
];

export const obsessions: string[] = [
  "온톨로지 기반 메모리",
  "Physical AI",
  "World Models",
  "지식 시스템",
  "박물관",
  "도서관",
  "사회적 추론 벤치마크",
  "앰비언트 인터페이스",
  "도시 계획",
  "시뮬레이션",
];

export const topics: Topic[] = [
  { name: "역사", x: 18, y: 28, blurb: "로마, 보급 체계, 문명의 기억 방식." },
  { name: "메모리", x: 40, y: 15, blurb: "데이터 조각, 요약, 영구 보존의 기준." },
  { name: "에이전트", x: 63, y: 27, blurb: "지능보다 중요한 조율. 소음 없는 상시 지원." },
  { name: "창업", x: 85, y: 20, blurb: "제품 배포, 피드백 수용, 사람 중심의 접근." },
  { name: "심리", x: 82, y: 56, blurb: "주의력의 작동 원리와 보호 방안." },
  { name: "디자인", x: 60, y: 78, blurb: "패턴, 맥락, 프롬프트로 담을 수 없는 요소." },
  { name: "언어", x: 33, y: 73, blurb: "사고를 구조화하는 핵심 인터페이스." },
  { name: "인프라", x: 14, y: 56, blurb: "의식하지 않아도 안정적으로 돌아가는 기반." },
];

export const topicEdges: [number, number][] = [
  [0, 1], [0, 6], [0, 7], [1, 2], [1, 4], [1, 6],
  [2, 7], [2, 3], [2, 5], [4, 6], [5, 6], [7, 5], [3, 2],
];

export const mapDefaultBlurb =
  "상호 연결된 8가지 핵심 주제입니다. 항목에 마우스를 올리면 연결된 영역이 활성화됩니다.";

export const moments: Moment[] = [
  {
    year: "2026",
    period: "2026년 5월 – 현재",
    title: "AI 엔지니어",
    body: "다양한 업계의 고객과 함께 AI 제품과 시스템을 구축하고 있습니다.",
    type: "practice",
  },
  {
    year: "2026",
    period: "2026년 4–5월",
    title: "리드 AI 아키텍트 · FunJoin",
    body: "특정 개인의 기억에 의존하지 않도록 사내 지식 관리 시스템을 체계화했습니다. 온보딩, 검색, AI 기반 개발을 위한 사내 도구를 구축했습니다.",
    type: "company",
  },
  {
    year: "2026",
    period: "2026년 1–4월",
    title: "독립 AI 컨설턴트 및 연구원",
    body: "비기술 창업자와 협력하여 Claude Code 기반 애플리케이션을 고도화했습니다. 맥락 관리, 메모리, 멀티 에이전트, 출력 검증 시스템에 관한 워크플로우 설계와 연구를 수행했습니다.",
    type: "practice",
  },
  {
    year: "2025",
    period: "2025년 9월 – 2026년 1월",
    title: "PersistOS / HeyContext",
    body: "에이전트 간 협업을 지원하는 멀티 에이전트 워크스페이스를 구축했습니다. 단순 채팅창을 넘어선 시스템을 구현하여 출시 한 달 만에 마케팅 비용 없이 수백 명의 사용자를 확보했습니다.",
    type: "company",
  },
  {
    year: "2025",
    period: "2025년 3–9월",
    title: "Divertissement / HeyContent",
    body: "Instagram, YouTube, Gmail, 메모를 통합 관리하는 크리에이터 페르소나 및 메모리 시스템을 개발했으며, 이후 HeyContext에 통합되었습니다.",
    type: "company",
  },
  {
    year: "2024",
    period: "2024년 11월 – 2025년 3월",
    title: "Brink Labs / Brink Mind",
    body: "음성 AI 및 Apple Watch 생체 데이터 연동 기반의 프라이버시 우선 멘탈 헬스 제품을 개발하며 기술 창업을 시작했습니다.",
    type: "company",
  },
  {
    year: "2024",
    period: "2024–2025",
    title: "해커톤 5회 우승",
    body: "Darwin (AWS), Armature (RL 트랙), Content Creator Connector, TheraVoice, HotAgents 우승 및 Freetime 파이널리스트 선정. 각각 24–48시간 내에 프로토타입을 구축하여 기술 가설을 신속하게 검증했습니다.",
    type: "achievement",
  },
  {
    year: "2024",
    period: "2024",
    title: "도서 출판",
    body: "Amazon에 시집 Notes on Surviving Eternity 출간. 시간, 운명, 자유의지를 탐구하며 언어적 압축과 구조화를 실험했습니다.",
    type: "creative",
  },
];

export const timelineTerminus = "...기록은 계속해서 누적됩니다";

export const hackathons: Hackathon[] = [
  {
    year: "2025",
    name: "Darwin",
    hackathon: "AWS AI Agents Hackathon",
    description: "더 정교한 도구를 자체 생성하는 AI 진화 시스템입니다. 모델들이 도구 생성을 겨루고, Semgrep 정적 분석을 통해 취약한 코드를 걸러내어 안전하고 최적화된 코드만 채택합니다.",
    award: "Best Use of Semgrep",
    metric: "우승",
    technologies: ["AWS Bedrock", "Semgrep", "AI Evolution", "Security"],
    link: "https://devpost.com/software/darwin-cmfysv",
  },
  {
    year: "2025",
    name: "Armature",
    hackathon: "Weavehacks-2, Self Improving Agents w/ Google Cloud",
    description: "매 실행마다 초기화되지 않고 과거 경험으로부터 학습하는 자기 개선 에이전트입니다. 오픈소스 패키지 armature-ai로 PyPI에 배포되었으며 HeyContext에 통합되었습니다.",
    award: "Reinforcement Learning Track",
    metric: "우승",
    technologies: ["BrowserBase + Stagehand", "Google ADK", "Tavily", "AG-UI", "Daytona", "W&B Weave", "Coreweave RL"],
    link: "https://devpost.com/software/the-convergence",
  },
  {
    year: "2025",
    name: "Content Creator Connector",
    hackathon: "Multimodal AI Agents",
    description: "회사명을 입력하면 적합한 크리에이터를 검색하고 브랜드를 분석하여 맞춤형 협업 제안 메일을 자동으로 생성 및 발송하는 플랫폼입니다.",
    award: "Best Use of Agno",
    metric: "우승",
    technologies: ["Gemini", "Agno", "Weave", "Wordware"],
    link: "https://devpost.com/software/content-creator-connector",
  },
  {
    year: "2024",
    name: "TheraVoice",
    hackathon: "Vertical Specific AI Agents Hackathon",
    description: "aiXplain 기반의 음성 우선 인터랙션 프로토타입입니다. 사용자의 음성을 인식하고 추론하여 음성으로 응답함으로써 자연스러운 성찰과 대화를 유도합니다.",
    award: "Best Use of AI/ML API",
    metric: "우승",
    technologies: ["aiXplain", "AI/ML"],
    link: "https://devpost.com/software/draft_name",
  },
  {
    year: "2024",
    name: "HotAgents",
    hackathon: "GPT-4o vs. Gemini 1.5 Hackathon",
    description: "단축키로 에이전트를 즉시 호출하여 고부가가치 LLM 활용 작업을 반복 가능한 단일 액션으로 압축하는 도구입니다.",
    award: "Best Use of Wordware",
    metric: "우승",
    technologies: ["Wordware", "AgentOps", "Electron"],
    link: "https://github.com/ariaxhan/hotagents",
  },
  {
    year: "2024",
    name: "Freetime",
    hackathon: "AI Agents 2.0 Hackathon",
    description: "공통 관심사를 기반으로 모임 일정을 자동 조율하는 소셜 플래닝 AI 도구입니다.",
    award: "",
    metric: "파이널리스트",
    technologies: ["Groq", "Supabase", "CrewAI", "JigsawStack"],
    link: "https://github.com/ariaxhan/freetime",
  },
];

export const CONTACT_EMAIL = "ariaxhan@gmail.com";

export const contactLinks: ContactLink[] = [
  { label: "ariaxhan@gmail.com", href: "mailto:ariaxhan@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/ariaxhan", external: true },
  { label: "Medium", href: "https://medium.com/@ariaxhan", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ariahan/", external: true },
  { label: "X (Twitter)", href: "https://x.com/aria__han", external: true },
];

export const projectReviewBullets: string[] = [
  "아키텍처 리스크 및 병목 진단",
  "에이전트 및 워크플로우 설계",
  "Claude Code, CoWork 세팅 및 저장소 구조 최적화",
  "메모리, 검색, 평가 시스템, 신뢰도 확보",
  "AI 보조 개발 프로젝트의 기술적 건전성 검토",
  "우선순위에 따른 기능 개발, 리팩터링 및 제거 계획",
];

export const reviewDeliverables: string[] = [
  "서면 진단 보고서",
  "핵심 기술 리스크 도출",
  "권장 아키텍처 개선안",
  "우선순위화된 실행 단계",
  "개선안에 따른 트레이드오프 분석",
  "필요 시 후속 기술 지원",
];

export const reviewAudience: string[] = [
  "AI 프로토타입을 보유한 창업자",
  "Claude Code, Cursor, CoWork 등을 실무에 활용하는 빌더",
  "에이전트 시스템을 구축 중인 엔지니어",
  "워크플로우의 확장성에 확신이 필요한 기업 팀",
  "단순 버그가 아닌 구조적 한계로 개발이 지연된 실무자",
];

export const notForAudience: string[] = [
  "단순 입문자 과외",
  "일반적인 이론 위주의 AI 강의",
  "맥락 없는 외주 개발 의뢰",
  "실시간 화상 미팅 중심의 일반 상담",
];

// ---------------------------------------------------------------------------
// WORK WITH ME
// ---------------------------------------------------------------------------

export const engagements: Engagement[] = [
  {
    title: "실무 AI 워크플로우 구축 및 교육",
    detail:
      "창업자와 독립 빌더를 위해 리서치, 작문, 운영, 의사결정에 필요한 실무 AI 워크플로우를 설계하고 교육하여 독립적으로 운용할 수 있도록 돕습니다.",
  },
  {
    title: "사내 운영 워크플로우 자동화",
    detail:
      "기업의 기존 도구, 파일, 사내 지식 체계와 AI를 결합한 내부 운영 워크플로우를 구축합니다. 실제 프로세스를 분석하여 맥락 단절 및 중복 작업을 제거합니다.",
  },
  {
    title: "창업자를 위한 AI 제품 개발",
    detail:
      "초기 아이디어 단계부터 실제 작동하는 AI 제품 배포까지 창업자와 긴밀히 협력합니다. 의사결정자와 직접 소통하며 문제 정의에 맞춰 기민하게 제품을 발전시킵니다.",
  },
  {
    title: "에이전트 시스템 아키텍처 설계",
    detail:
      "단일 프롬프트가 역할과 도구를 갖춘 에이전트 그래프로 분기되고, 불필요한 대화 비용 없이 인수인계 노트를 통해 협업하는 멀티 에이전트 오케스트레이션 아키텍처를 설계합니다.",
  },
  {
    title: "평가 시스템, 모니터링 및 품질 관리",
    detail:
      "고객이나 팀원이 문제를 발견하기 전에 AI 시스템이 의도대로 정확하게 작동하고 있는지 사전에 검증하는 평가 및 모니터링 체계를 구축합니다.",
  },
  {
    title: "Claude Code 및 AI 코딩 환경 최적화",
    detail:
      "Claude Code를 실무에 안정적이고 통제 가능한 방식으로 도입할 수 있도록 세팅합니다. 신규 프로젝트와 레거시 코드베이스의 차이를 고려한 최적의 코딩 워크플로우를 정립합니다.",
  },
  {
    title: "메모리, 컨텍스트 및 지식 관리 시스템",
    detail:
      "특정 개인의 기억에 의존하지 않도록 팀과 에이전트가 공유할 수 있는 메모리 및 지식 레이어를 구축합니다. 구조화된 산출물과 투명한 참조 체계를 제공합니다.",
  },
  {
    title: "AI 제품 리뷰 및 수리",
    detail:
      "AI 기반으로 개발된 제품이 디버깅이나 기능 확장에 한계를 겪고 있을 때, 장애 지점을 추적하고 프로토타입을 지속 개발 가능한 견고한 아키텍처로 개선합니다.",
  },
];

export const goodFit: string[] = [
  "최종 사용자의 경험과 효용을 중요하게 생각하는 분",
  "의미 있고 실질적인 가치를 제공하는 제품을 만들고자 하는 분",
  "정돈되지 않은 초기 프로토타입부터 실용적으로 개선할 준비가 된 분",
  "기술에 대한 깊은 이해를 바탕으로 함께 성장하고자 하는 분",
];

export const notAFit: string[] = [
  "단순 그로스 해킹 목적의 프로젝트",
  "마케팅 퍼널 생성에만 치중된 작업",
  "사람에 대한 고려 없이 기술 도입만을 목표로 하는 경우",
];

export const workingStyle =
  "간단한 통화나 서면 프로젝트 리뷰로 시작할 수 있습니다. 정돈된 보고서보다 의사결정자와 함께 시스템의 실제 상태를 직접 확인하며 일하는 방식을 선호합니다.";

// ---------------------------------------------------------------------------
// WRITING
// ---------------------------------------------------------------------------

export const WRITING_THEMES: { key: WritingTheme; label: string; note: string }[] = [
  {
    key: "agents",
    label: "AI 에이전트",
    note: "에이전트 조율, 안전성, 실무 환경에서의 작동 요건.",
  },
  {
    key: "memory-context",
    label: "메모리와 컨텍스트",
    note: "정보의 지속성, 승격 기준, 에이전트가 참조 가능한 지식 구조.",
  },
  {
    key: "evals-verification",
    label: "평가 시스템과 검증",
    note: "단순 체감이 아닌 실제 업무 기준의 정량적 모델 평가.",
  },
  {
    key: "ai-coding-workflows",
    label: "AI 코딩 워크플로우",
    note: "Claude Code를 프로덕션 레벨에서 안정적으로 운용하는 방법.",
  },
  {
    key: "philosophy-language",
    label: "철학과 언어",
    note: "도구와 시스템 이면에 존재하는 근본적인 질문들.",
  },
];

export const articles: Article[] = [
  {
    title: "AI 제품의 본질은 모델이 아닌 하네스입니다",
    excerpt:
      "코드는 모델이 작성하지만, 반복된 도구 호출 오류를 방지하고 제어하는 것은 하네스 시스템입니다.",
    theme: "agents",
    read: "9분",
    href: "https://medium.com/@ariaxhan/your-ai-harness-is-the-real-product-f0fabb3614c4",
  },
  {
    title: "AI 에이전트에게 API 키를 직접 전달하지 않는 방법",
    excerpt:
      "에이전트가 API 키를 요구할 때 즉시 점검해야 할 보안 원칙과 안전한 대안.",
    theme: "agents",
    read: "12분",
    href: "https://medium.com/@ariaxhan/how-to-secure-api-keys-for-ai-agents-ca773a66bd84",
  },
  {
    title: "에이전트 대응형 웹: Cloudflare 평가 기준 적용기",
    excerpt:
      "Cloudflare의 신규 에이전트 대응성 스캐너를 개인 사이트에 직접 적용하고 분석한 결과.",
    theme: "agents",
    read: "12분",
    href: "https://medium.com/@ariaxhan/the-agent-ready-web-a-working-guide-to-cloudflares-new-score-1ed0fce8d760",
  },
  {
    title: "ChatGPT로 Claude Code를 오케스트레이션하는 실험",
    excerpt: "하나의 언어 모델로 다른 모델을 지휘할 때 나타나는 시스템적 변화와 가능성.",
    theme: "agents",
    read: "5분",
    href: "https://medium.com/@ariaxhan/i-put-chatgpt-in-charge-of-claude-code-7b9bf5bb8ea9",
  },
  {
    title: "마크다운 대신 구조화된 메모리를 작성해야 하는 이유",
    excerpt: "마크다운은 사람의 시각에 최적화되어 있어 에이전트가 조회할 지식 데이터로는 부적합합니다.",
    theme: "memory-context",
    read: "6분",
    href: "https://medium.com/@ariaxhan/stop-writing-markdown-start-writing-memory-e4a69c57caa9",
  },
  {
    title: "KERNEL: 스스로 진화하는 Claude Code 설정 시스템",
    excerpt: "정적 설정의 한계를 극복하고 사용 패턴으로부터 스스로 학습하는 설정 엔진 구축기.",
    theme: "memory-context",
    read: "6분",
    href: "https://medium.com/@ariaxhan/kernel-the-ultimate-self-evolving-claude-code-and-cursor-configuration-system-a3ddeb7f4d32",
  },
  {
    title: "개인 데이터를 분석하는 저비용 AI 시스템",
    excerpt: "Synthesis Pool: 월 비용 0원으로 운영되는 개인 맞춤형 AI 아키텍처.",
    theme: "memory-context",
    read: "6분",
    href: "https://medium.com/@ariaxhan/the-synthesis-pool-0ce814fdfa5f",
  },
  {
    title: "Opus 4.8 vs 4.7 vs Sonnet vs Haiku: 고성능 모델의 실효성 분석",
    excerpt:
      "새로운 모델 출시 시 단순 벤치마크 점수가 아닌 실제 업무 생산성에서 느껴지는 유의미한 차이를 비교합니다.",
    theme: "evals-verification",
    read: "12분",
    href: "https://medium.com/@ariaxhan/opus-4-8-vs-4-7-vs-sonnet-vs-haiku-when-the-expensive-model-is-worth-it-44892a75d5c5",
  },
  {
    title: "AI 텍스트 탐지기가 실제로 측정하는 지표",
    excerpt:
      "AI 탐지 도구의 기술적 작동 원리와 그에 따른 한계 및 변동성을 분석합니다.",
    theme: "evals-verification",
    read: "6분",
    href: "https://medium.com/@ariaxhan/what-an-ai-detector-actually-measures-86b452979a5a",
  },
  {
    title: "Claude Code를 실무에 제대로 적용하는 방법",
    excerpt: "강력한 성능 이면에 존재하는 무질서함을 통제하고 구조화된 워크플로우를 정립하는 전략.",
    theme: "ai-coding-workflows",
    read: "12분",
    href: "https://medium.com/@ariaxhan/how-to-make-claude-code-actually-work-structure-memory-and-multi-agent-workflows-6d32b1d815d2",
  },
  {
    title: "타인의 AI 설정을 모방하지 않고 나만의 시스템을 구축하는 법",
    excerpt:
      "외부 워크플로우를 그대로 복사하기보다 자신의 실제 업무 데이터로 검증된 환경을 구축해야 합니다.",
    theme: "ai-coding-workflows",
    read: "10분",
    href: "https://medium.com/@ariaxhan/stop-copying-other-peoples-ai-setups-build-one-that-s-actually-yours-e1a05ebabc2a",
  },
  {
    title: "Claude Code를 활용한 로컬 자동화 구축",
    excerpt: "로컬 컨텍스트를 활용하여 능동적인 AI 자동화를 구현하는 아키텍처 패턴.",
    theme: "ai-coding-workflows",
    read: "4분",
    href: "https://medium.com/@ariaxhan/automations-with-claude-code-personalized-proactive-emails-and-code-poetry-from-local-context-3a7e93bf5a3d",
  },
  {
    title: "마찰을 흐름으로: Claude Code 명령어 라이브러리 구축",
    excerpt: "명령어를 통한 인지 부하 감소. 기억에 의존하지 않고 명확히 호출하는 시스템 만들기.",
    theme: "ai-coding-workflows",
    read: "5분",
    href: "https://medium.com/@ariaxhan/from-friction-to-flow-building-a-command-library-for-claude-code-a9eb19f7dce2",
  },
  {
    title: "AI 코딩 도구를 실무에 도입하기 전 알아야 할 10가지",
    excerpt: "프로덕션 환경에서 AI 코딩 도구를 매일 활용하며 얻은 실질적인 교훈.",
    theme: "ai-coding-workflows",
    read: "5분",
    href: "https://medium.com/@ariaxhan/10-things-i-wish-i-knew-when-i-started-using-ai-for-coding-887c26a6c1d1",
  },
  {
    title: "영혼을 엔지니어링한다는 것",
    excerpt:
      "기계 속의 유령을 설명하려는 엔지니어의 시도와 문학이 오랫동안 기록해 온 인간성에 대한 고찰.",
    theme: "philosophy-language",
    read: "6분",
    href: "https://medium.com/@ariaxhan/engineering-the-soul-49428c073c4e",
  },
  {
    title: "OpenAI의 신규 Codex 데스크톱 앱 분석",
    excerpt: "새로운 인터페이스의 효용성과 모델 응답 특성에 대한 심층 분석.",
    theme: "philosophy-language",
    read: "5분",
    href: "https://medium.com/@ariaxhan/i-tested-openais-new-codex-desktop-app-the-ui-is-the-real-product-c2c59bdcb5f6",
  },
  {
    title: "월 0원으로 25개 사이트와 10개 데이터베이스를 운영하는 방법",
    excerpt:
      "실제 서비스 중인 인프라 목록과 프리 티어 아키텍처를 투명하게 공개합니다.",
    theme: "ai-coding-workflows",
    read: "9분",
    href: "https://medium.com/@ariaxhan/i-run-25-websites-10-databases-and-a-fleet-of-apps-for-0-27ec36756668",
  },
  {
    title: "AI 도입 1년이 자유에 대해 시사하는 점",
    excerpt:
      "AI가 기업 조직을 더 강화하는 미래와 개인의 자율성을 극대화하여 조직의 필요성을 낮추는 미래에 대한 생각.",
    theme: "philosophy-language",
    read: "4분",
    href: "https://medium.com/@ariaxhan/what-a-year-of-ai-taught-me-about-freedom-86b2bd4e31c8",
  },
];

export const MEDIUM_PROFILE = "https://medium.com/@ariaxhan";

export function articlesByTheme(theme: WritingTheme): Article[] {
  return articles.filter((a) => a.theme === theme);
}

// ---------------------------------------------------------------------------
// PAGE COPY
// ---------------------------------------------------------------------------

export const PAGE_COPY = {
  metadata: {
    home: {
      path: "/",
    },
    about: {
      title: "소개 | Aria Han",
      description:
        "Aria Han. 언어에서 시작해, 지금은 창업자와 팀을 위한 AI 제품과 업무 시스템을 만듭니다.",
      path: "/about/",
    },
    contact: {
      title: "문의 및 협업 | Aria Han",
      description:
        "AI 워크플로우 설계, 창업 아이디어 검증, 사내 도구 개발, 멀티 에이전트 시스템 구축 문의.",
      path: "/contact/",
    },
    reading: {
      title: "독서 | Aria Han",
      description:
        "Aria Han의 최근 독서 기록: 소설, 회고록, 언어학, 시간여행, 미래 기술 등 사고의 기반이 되는 기록.",
      path: "/reading/",
    },
    hackathons: {
      title: "해커톤 | Aria Han",
      description:
        "2년간 해커톤 5회 우승, 1회 파이널리스트: Darwin (AWS), Armature (RL 트랙), Content Creator Connector, TheraVoice, HotAgents, Freetime.",
      path: "/hackathons/",
    },
    openSource: {
      title: "오픈소스 | Aria Han",
      description:
        "Aria Han의 공개 프로젝트 및 연구: 에이전트 메모리 구조, 실무 벤치마크, 검증 도구 및 자동화 파이프라인.",
      path: "/open-source/",
    },
    projectReview: {
      title: "프로젝트 리뷰 | Aria Han",
      description:
        "AI 프로젝트, 저장소 아키텍처, 도구 선택을 비동기로 심층 검토하는 전문 프로젝트 리뷰 서비스.",
      path: "/project-review/",
    },
    proof: {
      title: "움직임의 기록 | Aria Han",
      description:
        "Git 커밋 히스토리를 바탕으로 집계한 빌드 기록. 프로덕트, 에이전트, 메모리 시스템, 평가 체계 전반의 개발 활동 내역.",
      path: "/proof/",
    },
    systems: {
      title: "시스템 | Aria Han",
      description:
        "실무 마찰을 해결하기 위해 직접 구축한 Aria Han의 제품과 시스템: AI 학습, 연구 관리, 맥락 보존, 에이전트 조율.",
      path: "/systems/",
    },
    timeline: {
      title: "연혁 | Aria Han",
      description:
        "Aria Han의 연도별 이력: 언어와 소프트웨어, 3번의 창업, 해커톤, 로스앤젤레스에서의 AI 컨설팅 실무.",
      path: "/timeline/",
    },
    writing: {
      title: "글 | Aria Han",
      description:
        "Aria Han의 에세이 및 기술 현장 노트: AI 에이전트, 메모리 아키텍처, 평가 시스템, 실무 코딩 워크플로우.",
      path: "/writing/",
    },
  },
  layout: {
    keywords: [
      "Aria Han",
      "ariaxhan",
      "AI 컨설턴트",
      "로스앤젤레스 AI 컨설턴트",
      "AI 도입 컨설팅",
      "AI 에이전트 개발",
      "업무 자동화 컨설턴트",
      "AI 제품 수리",
      "AI 프로젝트 리뷰",
      "창업자 AI 워크플로우",
      "사내 AI 업무 자동화",
      "AI 연속성 시스템",
      "에이전트 오케스트레이션",
      "메모리 시스템",
      "평가 시스템",
      "Claude Code",
      "KERNEL",
      "로스앤젤레스",
    ],
    webMcpTools: {
      bio: "Aria Han 소개 마크다운 반환",
      projects: "Aria Han 프로젝트 목록 마크다운 반환",
      writing: "Aria Han 작성 글 목록 마크다운 반환",
    },
    agentDirective: {
      intro: "AI 에이전트 환경에서는 본 페이지의 마크다운 버전을 우선 참조하시기 바랍니다. 요청 헤더에",
      concise: "을 포함하면 요약 안내를,",
      complete: "을 포함하면 사이트 전체 미러를 제공합니다. 구조화된 JSON 데이터는 다음 경로에 있습니다:",
      mcp: "MCP 서버 카드:",
    },
  },
  navigation: {
    items: [
      { label: "Entrance", href: "/", n: "00" },
      { label: "About", href: "/about", n: "01" },
      { label: "Hackathons", href: "/hackathons", n: "02" },
      { label: "Systems", href: "/systems", n: "03" },
      { label: "Proof", href: "/proof/", n: "04" },
      { label: "Open Source", href: "/open-source", n: "05" },
      { label: "Reading", href: "/reading", n: "06" },
      { label: "Writing", href: "/writing", n: "07" },
      { label: "Timeline", href: "/timeline", n: "08" },
      { label: "Contact", href: "/contact", n: "09" },
    ],
    ariaToggle: "Toggle studio index",
    open: "Index",
    close: "Close",
    groups: [
      { label: "Studio", hrefs: ["/", "/about", "/timeline"] },
      { label: "Work", hrefs: ["/systems", "/open-source", "/hackathons", "/proof/"] },
      { label: "Notes", hrefs: ["/reading", "/writing"] },
      { label: "Door", hrefs: ["/contact"] },
    ],
  },
  footer: {
    line: "모든 기술과 시스템의 중심에는 언제나 사람이 있습니다.",
    links: [
      { label: "ModelMind", href: "https://model-mind.org", external: true },
      { label: "Paper Rooms", href: "https://paper-rooms.com", external: true },
      { label: "SUBSTRATE", href: "https://nexus-substrate.pages.dev", external: true },
      { label: "오픈소스", href: "/open-source" },
      { label: "글", href: "/writing" },
      { label: "독서", href: "/reading" },
      { label: "움직임의 기록", href: "/proof/" },
      { label: "문의", href: "/contact" },
    ],
    place: "Aria Han · 로스앤젤레스 · 2026",
    handleLine: "GitHub, PyPI, Devpost에서도 ariaxhan으로 활동하고 있습니다.",
    motto: "새로움보다 연속성",
  },
  hero: {
    builtSince: "2024년부터 만들어 온 기록",
    ctas: [
      { label: "시스템 둘러보기", href: "/systems/" },
      { label: "글 읽기", href: "/writing/" },
      { label: "기록 확인하기", href: "/proof/" },
      { label: "서가 보기", href: "/reading/" },
      { label: "상담 예약하기", href: "/contact/" },
    ],
    githubTitle: "GitHub",
    githubInitial: "G",
    githubNote: "오픈소스 도구, 실험, 실제 구동되는 코드.",
  },
  about: {
    label: "소개",
    title: "Aria Han입니다",
    subtitle: "언어에서 시작해, 지금은 AI 제품과 업무 시스템을 만듭니다.",
    narrative: [
      "저는 언어에서 시작했습니다. 저널리즘, 에세이, 스토리, 리서치처럼 복잡한 생각을 이해하고 구조화해 전달하는 일을 오래 해왔습니다. 컴퓨터과학을 배울 때도 완전히 다른 분야로 옮겨간다기보다, 생각을 표현하고 움직이게 만드는 새로운 언어를 하나 더 익힌다는 느낌에 가까웠습니다.",
      "언어 모델이 등장하면서 그 두 영역은 자연스럽게 하나가 됐습니다.",
      "제가 만드는 제품과 시스템도 대부분 같은 곳에서 출발합니다. 반복해서 손이 가는 일, 필요한 정보가 흩어져 있는 일, 도구는 많은데 일이 오히려 복잡해지는 순간입니다. 그런 마찰을 발견하면 원인을 정리하고, 사람이 계속 신경 쓰지 않아도 돌아가는 구조로 바꿉니다.",
    ],
    pulls: [
      "그래서 특정 기술 자체가 제 일의 중심은 아닙니다.",
      "에이전트, 메모리, 평가 시스템, 자동화는 문제에 따라 선택하는 수단입니다.",
    ],
    narrative2: [
      "중요한 것은 사람이 직접 판단해야 할 일과 시스템에 맡겨도 되는 일을 구분하고, 둘이 실제 업무 안에서 자연스럽게 이어지게 만드는 것입니다.",
      "세 번의 창업과 여러 팀과의 협업을 거치며, AI 도입에서 가장 어려운 부분은 모델을 고르는 일이 아니라는 것을 반복해서 확인했습니다. 이미 존재하는 제품, 데이터, 업무 방식 안에서 AI가 어디에 들어가야 실제로 도움이 되는지를 결정하고, 그 구조를 안정적으로 운영할 수 있게 만드는 일이 더 어렵습니다.",
      "현재는 창업자와 팀을 대상으로 AI 제품을 구축하거나 개선하고, 개인 및 조직의 업무에 맞는 AI 워크플로우와 내부 시스템을 설계합니다.",
      "새로운 모델이나 도구를 빠르게 도입하는 것 자체에는 큰 의미를 두지 않습니다. 기존 방식보다 분명히 나은 방법이 생겼을 때 검토하고, 실제 업무가 더 단순하고 빠르고 안정적으로 돌아가도록 적용합니다.",
    ],

    worksWithLabel: "협업 역량 및 기술 스택",
    worksWith: [
      "Claude Code, Codex 등",
      "자가 개선 시스템",
      "멀티 에이전트 오케스트레이션",
      "조율 프로토콜",
      "스킬, 훅, 플러그인 아키텍처",
      "강화학습",
      "컨텍스트 및 메모리 시스템",
      "프롬프트 엔지니어링 및 아키텍처",
      "평가 시스템 및 벤치마크",
    ],
    focusLabel: "현재 집중하고 있는 프로젝트",
    focus: [
      { name: "KERNEL", text: "Claude Code 플러그인. 영구 메모리, 충돌 없는 분업 에이전트, 워크플로우 실효성 검증 엔진. 오픈소스 배포 완료." },
      { name: "llm-bench", text: "로컬 및 API 언어 모델을 위한 실무 워크플로우 벤치마크. 프로그래밍 방식의 검증기로 채점." },
      { name: "model-familiarity-engine", text: "결과가 검증된 작업을 리플레이하여 실측 관찰 데이터 기반의 모델 카드를 생성." },
      { name: "the-agent-library", text: "자체 검토, 기획, 아이디어 도출, 리서치, 테크니컬 라이팅, 엔지니어링을 위한 포터블 에이전트 스킬 라이브러리." },
    ],
    locationLabel: "위치",
    location: "로스앤젤레스, CA",
  },
  manifesto: {
    label: "살펴보기 전에",
    lead: [
      "이곳의 작업들은 실제 업무에서 마주한 마찰의 기록입니다. AI 교육의 비효율, 브라우저 탭 속에 묻히는 연구 자료, 대화가 길어질수록 유실되는 맥락, 매일 아침 초기화되는 작업 환경을 해결하기 위해 시작되었습니다.",
    ],
    columns: [
      [
        "실사용자와 투자 유치 이력을 가진 제품을 구축해 보았고, 광고나 결제 없이 무료로 공개한 애플리케이션도 개발했습니다.",
        "차이는 비즈니스 모델에 있지 않습니다.",
        "핵심은 그 시스템이 사람의 지속적인 학습을 돕고, 맥락을 보존하며, 명확한 증거를 남기고, 유의미한 상호작용을 지속시키는가에 있습니다.",
      ],
      [
        "기술 구축의 근본적인 동기는 AI를 통해 사람의 역량을 온전하게 발휘하도록 돕는 데 있습니다.",
        "따라서 축적되는 메모리, 배경으로 자연스럽게 녹아드는 도구, 시스템을 명확히 이해하도록 돕는 개념 정의를 지향합니다. 기계적인 반복 작업은 AI가 전담하고, 사람은 본질적인 판단과 창의성에 집중할 수 있는 연속성 있는 구조를 만듭니다.",
      ],
    ],
  },
  thesis: {
    line1: "사람이 계속 신경 쓰지 않아도 돌아가는 구조를 만듭니다.",
  },
  sections: {
    whatIBuild: {
      fig: "Fig. 01",
      label: "제공 가능한 서비스",
      title: "기여할 수 있는 주요 영역",
      note: "기술적 완성도를 추구하며 깊이 있게 고민하는 파트너와의 협업을 지향합니다.",
      unsure: "비슷한 일이라도 편하게 문의해 주세요.",
    },
    projectMap: {
      fig: "Fig. 02",
      label: "핵심 과제",
      title: "각 프로젝트는 지속적인 질문에 대한 해답입니다",
      note: "AI를 어떻게 효과적으로 학습할 것인가, 방대한 연구 자료를 어떻게 체계화할 것인가, AI는 맥락을 어떻게 기억해야 하는가, 팀은 에이전트와 어떻게 협업해야 하는가에 대한 실천적 결과물입니다.",
      defaultCaption:
        "13개의 주요 프로젝트를 핵심 질문별로 정리했습니다: AI 학습, 연구 자료 분석, 맥락 보존, 에이전트 조율, 증거 기반 검증, 작업 연속성 확보.",
      plainText: "목록으로 보기",
    },
    writingHighlights: {
      fig: "Fig. 03",
      label: "글",
      title: "실무 현장의 기술 노트",
      note: "에이전트, 메모리, 도구, 언어, 그리고 기술이 업무에 미치는 영향에 대한 실무 중심의 기술 에세이입니다.",
      readOnMedium: "Medium에서 읽기",
      allWriting: "글 전체 보기",
    },
    workWithMeDoor: {
      label: "협업 안내",
      call: "프로젝트 상담하기",
      takeOn: "주요 협업 분야",
    },
    livingDesk: {
      fig: "Fig. 01",
      label: "스튜디오",
      title: "주요 작업 공간",
      note: "각 항목을 선택하면 해당 섹션으로 이동합니다.",
    },
    curiosityMap: {
      fig: "Fig. 04",
      label: "관심 주제 지도",
      title: "상호 연결된 핵심 아이디어",
      note: "주제 간의 유기적인 연결 구조를 확인할 수 있습니다. 노드에 마우스를 올려보세요.",
    },
    obsessions: {
      fig: "Fig. 07",
      label: "현재의 탐구 주제",
      title: "최근 집중하고 있는 연구 분야",
      note: "지속적으로 업데이트되는 관심사 목록입니다.",
      prefix: "현재",
    },
    hackathons: {
      fig: "Fig. 02c",
      label: "해커톤",
      title: "압박 속에서 검증한 프로젝트",
      note: "2년간 5회 우승, 1회 파이널리스트. 24–48시간 내에 핵심 가설을 구현하고 검증했습니다.",
    },
    timeline: {
      fig: "Fig. 06",
      label: "연혁",
      title: "연도별 주요 이력",
      note: "3번의 창업, 5회의 해커톤 우승, 수많은 빌더들과의 협업 과정에서 축적된 기록입니다.",
    },
    systems: {
      fig: "Fig. 02",
      label: "시스템 기원",
      title: "실무 마찰에서 탄생한 시스템",
      note: "AI 도입, 리서치, 학습, 조율 과정에서 마주한 비효율을 직접 해결하기 위해 개발한 제품과 시스템입니다.",
    },
    openSource: {
      fig: "Fig. 02b",
      label: "오픈소스",
      title: "오픈소스 프로젝트",
      note: "메모리 시스템, 벤치마크, 평가 도구, 포터블 워크플로우, 생성형 아트 실험 등 축적된 결과물을 공개합니다.",
    },
    writing: {
      fig: "Fig. 09",
      label: "글",
      title: "기술 에세이",
      note: "에이전트, 메모리 아키텍처, 모델 행동 특성, 도구, 언어에 관한 기술 에세이 및 실무 기록입니다.",
      allMedium: "Medium 전체 글 보기",
    },
    bookshelf: {
      fig: "Fig. 11",
      label: "독서",
      title: "최근 읽은 책",
      note: "사고의 기반이 되는 독서 목록: 소설, 회고록, 언어학, 기술 철학 등 깊이 있는 통찰을 주는 서적들입니다.",
      current: "현재 가장 추천하는 책",
      hoverHint: "서가에서 책을 선택해 보세요.",
      selectedLabel: "선택한 도서 메모",
    },
  },
  now: {
    label: "지금 · 2026년 9월",
    title: "현재 여러 클라이언트와 독립적으로 일하고 있습니다.",
    body:
      "창업자와 팀을 대상으로 AI 제품을 구축하거나 개선하고, 개인 및 조직의 업무에 맞는 AI 워크플로우와 내부 시스템을 설계합니다.",
    timelineLink: "연혁 전체",
  },
  contact: {
    fig: "Fig. 10 · 협업 안내",
    title: "프로젝트 상담하기",
    intro: "기술적 완성도를 지향하며 깊이 있게 고민하는 분들과의 협업을 환영합니다. 기술 자체보다 사람의 효용을 중시하는 프로젝트를 선호합니다.",
    takeOn: "주요 협업 분야",
    goodFit: "적합한 프로젝트",
    notFit: "부적합한 프로젝트",
    booking: "상담 예약하기",
    projectReview: "프로젝트 리뷰",
    projectReviewLine:
      "아이디어, 아키텍처, 향후 개발 로드맵에 대한 1회성 비동기 정밀 진단 서비스입니다.",
    submit: "프로젝트 접수하기",
    elsewhere: "기타 채널",
  },
  projectReview: {
    header: {
      fig: "Fig. 10A",
      label: "프로젝트 리뷰",
      title: "정리되지 않은 초기 버전도 환영합니다.",
      note: "1회성 비동기 정밀 리뷰는 무료로 제공되며, 추가 협업은 사안에 따라 논의합니다.",
    },
    intro:
      "프로젝트의 기획 의도, 아키텍처 구조, 활용 도구, 그리고 구현자의 고유한 문제의식을 중점적으로 검토합니다.",
    note:
      "AGENTS.md, CLAUDE.md, 스펙 문서, 프롬프트, 아키텍처 다이어그램, 메모 등을 첨부해 주시면 코드 검토 전 우선적으로 파악합니다.",
  },
  projectReviewForm: {
    stages: ["아이디어", "프로토타입", "초기 구현 완료", "라이브 운영 중", "아키텍처 재구축"],
    projectTypes: [
      "기획 및 방향성",
      "아키텍처 설계",
      "도구 및 스택 선정",
      "Claude Code",
      "Codex",
      "Cursor",
      "에이전트 시스템",
      "AI 생성 코드 리팩터링",
      "오픈소스 프로젝트",
      "포트폴리오 / 제품",
    ],
    validation: {
      missingStage: "프로젝트 진행 단계를 선택해 주시기 바랍니다.",
      sendError: "제출 과정에서 오류가 발생했습니다.",
      sent: "성공적으로 접수되었습니다. 이메일로 답변드리겠습니다.",
      sentWithReference: "성공적으로 접수되었습니다. 이메일로 답변드리겠습니다. 참조 번호: ",
      fallbackError: "전송에 실패했습니다. 오류가 지속되면 이메일로 직접 문의해 주시기 바랍니다.",
    },
    introLabel: "프로젝트 정보 제출",
    introTitle: "문제의식과 의도를 파악한 후 시스템 구조를 검토합니다.",
    introNote: "AGENTS.md, CLAUDE.md, 프롬프트, 다이어그램, 메모, 코드 등을 공유해 주시기 바랍니다. 초기 단계의 거친 자료라도 충분히 유의미한 검토가 가능합니다.",
    fields: {
      name: "이름",
      email: "이메일",
      projectName: "프로젝트 이름",
      stage: "진행 단계",
      lookAt: "중점 검토 요청 사항",
      origin: "프로젝트 시작 배경",
      uniqueContribution: "이 프로젝트만의 고유한 차별점",
      artifactIntent: "목표하는 최종 형태",
      architecture: "아키텍처 및 활용 도구",
      links: "참조 링크 및 문서",
      question: "핵심 의사결정 고민",
      timeline: "희망 일정",
      company: "회사 / 소속",
    },
    placeholders: {
      origin: "이 아이디어는 어디서 출발했나요? 직접 구축하게 된 계기는 무엇인가요?",
      uniqueContribution:
        "자신만의 도메인 지식, 특별한 제약 조건, 실제 경험 등 템플릿화할 수 없는 차별화 요소를 기재해 주세요.",
      artifactIntent:
        "오픈소스, 포트폴리오, 상용 제품, 사내 도구, 연구 프로젝트 등 목표를 기재해 주세요.",
      architecture:
        "에이전트, 메모리, 평가 체계, 데이터베이스, 호스팅 환경, 저장소 구조, AI 코딩 세팅 등을 기재해 주세요.",
      links: "저장소, 데모, 스크린샷, AGENTS.md, CLAUDE.md, README, 시연 영상, 다이어그램, 메모 등",
      question:
        "차별화 방안, AI 생성 코드 정리, 도구 선정, 아키텍처 재설계 등 자문이 필요한 부분을 적어 주세요.",
      timeline: "이번 주, 일정 조율 가능, 긴급 등",
    },
    submit: "프로젝트 검토 요청하기",
    sending: "전송 중",
    idle: "첫 비동기 리뷰는 무료로 제공되며, 추가 협업은 개별 논의합니다.",
  },
  projectReviewApi: {
    errors: {
      jsonOnly: "요청 본문은 폼 인코딩이 아닌 JSON 형식이어야 합니다.",
      tooLong: "제출 내용이 너무 깁니다. 핵심 내용을 먼저 작성해 주시기 바랍니다.",
      unreadable: "제출된 폼 데이터를 파싱하지 못했습니다.",
      localEmail:
        "로컬 개발 환경에서 폼 데이터가 정상 수신되었습니다. 실제 이메일 발송은 Cloudflare Pages 환경에서 처리됩니다.",
      missingName: "이름을 입력해 주시기 바랍니다.",
      invalidEmail: "유효한 이메일 주소를 입력해 주시기 바랍니다.",
      missingStage: "프로젝트 진행 단계를 선택해 주시기 바랍니다.",
      missingOrigin: "프로젝트 시작 배경을 작성해 주시기 바랍니다.",
      missingUniqueContribution: "프로젝트만의 차별점을 작성해 주시기 바랍니다.",
      missingArtifactIntent: "목표하는 최종 형태를 작성해 주시기 바랍니다.",
      missingQuestion: "결정이 필요한 핵심 고민 사항을 작성해 주시기 바랍니다.",
    },
  },
  proof: {
    header: {
      fig: "Fig. 06",
      label: "움직임의 기록",
      title: "개발 활동 기록",
      note: "실제 Git 커밋 기록을 영역별로 집계한 데이터입니다. 비공개 저장소 및 클라이언트 작업은 활동 수치로만 집계되며 프로젝트명은 비공개 처리됩니다.",
    },
    paragraph1Start:
      "이 데이터는 실제 Git 커밋 히스토리에서 집계됩니다:",
    paragraph1End:
      "월별 및 영역별(메모리, 평가 체계, 에이전트, 상용 제품, 창업, 구현, 연구 실험)로 분류된 누적 활동 기록입니다. 비공개, 클라이언트, 사내 프로젝트는 수치에만 반영됩니다.",
    paragraph2Start: "",
    paragraph2CommitsAcross: "커밋 완료 ·",
    paragraph2RepositoriesOnMachine: "개 저장소에 걸친 활동,",
    paragraph2AfterSpan:
      "",
    paragraph2ScopeStart: "공개 범위 기준: GitHub 프로필에는 총",
    paragraph2ScopeMiddle: "개의 공개 저장소가 있으며, 여기에 표시된",
    paragraph2ScopeEnd: "개 저장소는 해당 기간 동안 실제 커밋 활동이 기록된 저장소(인증 토큰으로 조회된 비공개 저장소 포함)입니다.",
  },
  systemDiagram: {
    label: "워크플로우 아키텍처",
    aria:
      "비정형 워크플로우가 메모리, 컨텍스트, 평가 시스템, 에이전트 조율을 거쳐 안정적인 프로덕션 구현으로 완성되는 흐름도입니다.",
    chambers: ["메모리", "컨텍스트", "평가 시스템", "에이전트"],
    messy: ["비정형", "워크플로우"],
    working: ["안정적인", "프로덕션 구현"],
    captionStart:
      "좌측에서 우측으로: 비정형 워크플로우가 메모리, 컨텍스트, 평가 시스템, 에이전트 조율을 거쳐 안정적인 시스템 구현으로 완성됩니다.",
  },
  workshopWall: {
    cardPrefix: "스튜디오",
    cardCta: "스토리 읽기",
    permalinkCta: "고유 링크:",
    videoPlayPrefix: "재생",
    screenshotPrefix: "확인",
    screenshotSuffix: "스크린샷",
    openScreenshot: "스크린샷 원본 보기",
    sections: {
      built: "구축 내용",
      problem: "해결한 문제",
      proof: "검증 결과",
      learned: "학습한 점",
      proves: "증명하는 역량",
      stack: "기술 스택",
      themes: "분류 테마",
      connected: "연계 프로젝트",
    },
  },
  agentText: {
    canonicalRoutes: [
      { path: "/", purpose: "홈페이지. Aria Han과 핵심 업무에 대한 10초 요약 소개." },
      { path: "/about/", purpose: "Aria Han의 상세 소개, 실무 철학, 검증된 지표." },
      { path: "/systems/", purpose: "출시된 제품 및 창업 이력, 실증 데이터." },
      { path: "/open-source/", purpose: "공개 오픈소스 저장소 및 연구 결과물." },
      { path: "/writing/", purpose: "주제별 기술 에세이. 본문 링크는 Medium으로 연결." },
      { path: "/proof/", purpose: "움직임의 기록. Git 기반의 누적 빌드 데이터." },
      { path: "/reading/", purpose: "최근 읽은 도서 및 메모. 사고의 기반이 되는 입력 자료." },
      { path: "/timeline/", purpose: "연도별 역할 및 주요 마일스톤." },
      { path: "/hackathons/", purpose: "압박 속에서 검증한 해커톤 프로젝트 및 수상 내역." },
      { path: "/contact/", purpose: "협업 방식, 적합성 기준, 상담 예약 안내." },
      { path: "/project-review/", purpose: "전문 프로젝트 리뷰를 위한 구조화된 접수 창구." },
    ],
    endpoints: [
      { path: "/llms.txt", purpose: "본 사이트에 대한 AI 에이전트용 간략 안내서." },
      { path: "/llms-full.txt", purpose: "사이트 전체 콘텐츠의 마크다운 미러." },
      { path: "/api/site-index.json", purpose: "사이트 메타데이터, 라우트 맵, 엔드포인트 목록." },
      { path: "/api/projects.json", purpose: "전체 프로젝트의 구조화된 데이터." },
      { path: "/api/writing.json", purpose: "주제별로 분류된 글 목록 데이터." },
      { path: "/api/work-with-me.json", purpose: "협업 방식, 적합성 기준, 예약 링크 데이터." },
      { path: "/.well-known/agent-card.json", purpose: "A2A 에이전트 카드 메타데이터." },
      { path: "/.well-known/mcp/server-card.json", purpose: "MCP 서버 카드 메타데이터." },
      { path: "/.well-known/api-catalog", purpose: "머신 판독용 엔드포인트 링크 세트." },
      { path: "/.well-known/agent-skills/index.json", purpose: "에이전트 스킬 인덱스." },
      { path: "/mcp", purpose: "MCP 엔드포인트. 스트리밍 HTTP 기반 JSON-RPC 프로토콜." },
    ],
    preferences: {
      aiTrain: "no",
      search: "yes",
    },
    labels: {
      name: "이름",
      role: "직무",
      location: "위치",
      site: "웹사이트",
      email: "이메일",
      github: "GitHub",
      medium: "Medium",
      linkedIn: "LinkedIn",
      x: "X",
      source: "출처",
      verified: "검증 일자",
      nonePublic: "공개 내역 없음",
      status: "상태",
      proof: "검증 지표",
      stack: "기술 스택",
      links: "관련 링크",
      thesis: "핵심 명제",
      kind: "분류",
      problem: "해결 과제",
      built: "구축 내용",
      learned: "학습 내용",
      proves: "입증 역량",
      themes: "분류 테마",
      connectsTo: "연계 프로젝트",
      none: "없음",
      closing: "핵심 요약",
      pages: "페이지 목록",
      agentResources: "에이전트 리소스",
      preferences: "접근 정책",
      identity: "신원 정보",
      elsewhere: "외부 채널",
      booking: "예약 링크",
      bio: "소개",
      verifiedNumbers: "검증된 지표",
      products: "제품 및 창업",
      openSource: "오픈소스 및 연구",
      writing: "작성 글",
      timeline: "연혁",
      hackathons: "해커톤",
      workWithMe: "협업 안내",
      engagementTypes: "협업 유형",
      goodFit: "적합한 프로젝트",
      notFit: "부적합한 프로젝트",
      contact: "문의처",
      agentPreferences: "에이전트 처리 방침",
      training: "모델 학습 활용",
      disallowed: "불가",
      allowed: "허용",
      inference: "출처 인용을 동반한 추론 및 참조",
      searchIndexing: "검색 인덱싱",
      machineEndpoints: "머신 판독용 엔드포인트:",
      result: "결과",
      tech: "기술",
      link: "링크",
      call: "상담",
      projectReviewIntake: "프로젝트 리뷰 접수",
      fullSiteMirror: "사이트 전체 마크다운 미러",
      aboutPrefix: "소개",
      systemsPrefix: "시스템",
      openSourcePrefix: "오픈소스",
      writingPrefix: "글",
      timelinePrefix: "연혁",
      hackathonsPrefix: "해커톤",
      proofPrefix: "움직임의 기록",
      totalCommits: "총 커밋 수",
      repositoriesOnMachine: "저장소 수",
      span: "기간",
      generated: "생성 일시",
      constellations: "분류 영역",
      eras: "활동 기간",
      fullHistory: "전체 기록",
      fullBioLinks: "상세 소개 및 링크",
      projectsPrefix: "프로젝트",
      fullRecords: "전체 데이터",
      groupedByTheme: "주제별 분류",
      structured: "구조화 데이터",
    },
    notes: {
      verifiedNumbers: "모든 수치는 검증된 출처를 바탕으로 하며 변경 시 재검증을 거칩니다.",
      writingIntro: "에이전트, 메모리, 평가 체계, AI 코딩 워크플로우에 대한 기술 에세이입니다.",
      projectReviewIntake: "구조화된 프로젝트 리뷰 접수 시스템",
      proofIntro:
        "실제 Git 커밋 히스토리를 영역별로 집계한 데이터입니다. 비공개 저장소 및 클라이언트 작업은 활동 수치로만 집계되며 프로젝트명은 비공개 처리됩니다.",
    },
  },
  statsApi: {
    motionNote: "scripts/proof-of-motion.mjs를 통해 GitHub 기여 히스토리 및 빌드 시 조회 가능한 저장소로부터 자동 집계됩니다. /proof/ 참조",
    hackathonNote: "5회 우승 및 1회 파이널리스트 선정. 세부 증빙은 /hackathons/ 참조",
  },
  modal: {
    closeAria: "대화 상자 닫기",
    close: "닫기",
  },
  motion: {
    stripLabel: "움직임의 기록 · 실시간 Git 기반 집계",
    stripClaim: "주장이 아닌 실증 기록입니다.",
    stripCta: "상세 지층 보기",
    stripSummaryPrefix: "누적 빌드 기록:",
    stripSummaryMiddle: "커밋 ·",
    stripSummarySuffix: "개 저장소",
    stripSummaryCta: "전체 기록 보기",
    strataDefaultSuffix: "포인트를 선택하면 해당 월의 세부 기록이 표시됩니다.",
    textRecord: "텍스트 기록 보기",
    commits: "커밋",
    privateRepo: "비공개 저장소",
    eras: [
      {
        key: "founder",
        name: "창업 기간",
        range: "2024년 11월 – 2026년 1월",
        caption: "샌프란시스코 기반 AI 스타트업 창업 및 운영.",
        start: "2024-11",
        end: "2025-12",
      },
      {
        key: "independent",
        name: "독립 연구 기간",
        range: "2026년 1–4월",
        caption: "로스앤젤레스에서 독립 연구 수행. 메모리, 평가 시스템, 에이전트 도구 개발.",
        start: "2026-01",
        end: "2026-03",
      },
      {
        key: "implementation",
        name: "구현 및 컨설팅",
        range: "2026년 4월 – 현재",
        caption: "클라이언트 프로젝트 및 사내 AI 시스템 구축 컨설팅.",
        start: "2026-04",
        end: "AXIS_END",
      },
    ],
  },
  wellKnown: {
    agentCard: {
      name: "Aria Han 포트폴리오 에이전트",
      version: "1.1.0",
      description:
        "로스앤젤레스 기반 AI 컨설턴트 Aria Han의 A2A 에이전트 카드입니다. 창업자와 독립 빌더를 위한 AI 제품 구축 및 개선, 기업 운영팀을 위한 사내 워크플로우를 개발합니다. 소개, 프로젝트, 글에 대한 읽기 전용 조회를 제공합니다.",
      skills: {
        bio: {
          id: "get_bio",
          name: "소개 조회",
          description: "Aria Han의 직업적 소개를 반환합니다.",
          tags: ["bio", "about"],
          examples: ["Aria Han은 어떤 일을 하나요?", "Aria Han에 대해 알려주세요."],
        },
        projects: {
          id: "get_projects",
          name: "프로젝트 조회",
          description: "Aria Han의 공개 프로젝트 및 오픈소스 목록을 반환합니다.",
          tags: ["projects", "open-source"],
          examples: ["Aria가 진행 중인 프로젝트는 무엇인가요?", "Aria의 프로젝트 목록을 보여주세요."],
        },
        writing: {
          id: "get_writing",
          name: "글 목록 조회",
          description: "Aria Han의 공개 에세이 및 기술 글 목록을 반환합니다.",
          tags: ["writing", "essays"],
          examples: ["Aria가 작성한 글은 무엇이 있나요?", "Aria의 에세이 목록을 보여주세요."],
        },
      },
    },
    mcpServerCard: {
      name: "ariaxhan-portfolio",
      title: "Aria Han 포트폴리오",
      version: "1.0.0",
      description: "Aria Han의 포트폴리오 콘텐츠(소개, 프로젝트, 글)를 제공하는 읽기 전용 MCP 서버입니다.",
      tools: {
        bio: {
          name: "get_bio",
          title: "소개 조회",
          description: "Aria Han의 직업적 소개를 마크다운 형식으로 반환합니다.",
        },
        projects: {
          name: "get_projects",
          title: "프로젝트 조회",
          description: "Aria Han의 공개 프로젝트 목록을 반환합니다.",
        },
        writing: {
          name: "get_writing",
          title: "글 목록 조회",
          description: "Aria Han의 공개 글 목록을 반환합니다.",
        },
      },
    },
    apiCatalog: {
      fullSite: "사이트 전체 콘텐츠 (LLM 친화적)",
      siteIndex: "사이트 메타데이터, 라우트 맵, 엔드포인트 목록",
      projects: "전체 프로젝트의 구조화된 데이터",
      writing: "주제별로 분류된 글 목록",
      workWithMe: "협업 방식, 적합성 기준, 상담 예약 안내",
      conciseGuide: "AI 에이전트용 요약 안내서",
      aboutMarkdown: "소개 페이지 (마크다운)",
      sitemap: "사이트맵",
      agentCard: "A2A 에이전트 카드",
      mcpServerCard: "MCP 서버 카드",
    },
    agentSkillsIndex: {
      bio: {
        name: "aria-bio",
        type: "skill-md",
        description: "Aria Han의 직업적 소개와 현재 집중 분야를 조회합니다.",
      },
      projects: {
        name: "aria-projects",
        type: "skill-md",
        description: "Aria Han의 공개 프로젝트 및 오픈소스 목록을 조회합니다.",
      },
      writing: {
        name: "aria-writing",
        type: "skill-md",
        description: "Aria Han의 공개 글 및 기술 에세이 목록을 조회합니다.",
      },
    },
    agentSkills: {
      bio: {
        name: "aria-bio",
        description: "Aria Han의 직업적 소개와 현재 집중 프로젝트를 조회합니다.",
        purpose: "AI 답변 엔진이 인용하기 적합한 구조화된 요약 소개를 반환합니다.",
        invocation: [
          "소개 내용 및 검증 지표를 마크다운으로 조회하려면 `https://ariaxhan.com/about/index.md`를 호출하십시오.",
          "구조화된 메타데이터, 라우트 맵, 엔드포인트는 `https://ariaxhan.com/api/site-index.json`을 호출하십시오.",
        ],
        outputIntro: "마크다운(about) 또는 JSON(site-index) 데이터 구성:",
        output: [
          "이름 및 직무",
          "위치",
          "집중 영역 및 검증 지표",
          "공개 작업 링크",
        ],
        attribution: "본 콘텐츠 인용 시 `https://ariaxhan.com`을 명시하십시오.",
      },
      projects: {
        name: "aria-projects",
        description: "Aria Han의 공개 프로젝트 및 오픈소스 목록을 조회합니다.",
        purpose: "Aria Han의 프로젝트 데이터를 검증 가능한 구조화된 형식으로 제공합니다.",
        invocation: [
          "전체 구조화 데이터는 `https://ariaxhan.com/api/projects.json`을 호출하십시오.",
          "(핵심 명제, 상태, 문제 정의, 기술 스택, 검증 지표, 링크, 테마, 연계 프로젝트)",
          "오픈소스 프로젝트의 요약 마크다운은",
          "`https://ariaxhan.com/open-source/index.md`를 호출하십시오.",
        ],
        outputIntro: "프로젝트 JSON 배열 또는 프로젝트명, 핵심 명제, 상태, 검증 지표, 링크를 포함한 마크다운 목록.",
        output: [],
        attribution: "`https://ariaxhan.com/open-source`를 출처로 인용하십시오.",
      },
      writing: {
        name: "aria-writing",
        description: "Aria Han의 공개 글 및 기술 에세이 목록을 조회합니다.",
        purpose: "Aria Han의 공개 에세이를 주제별로 분류하여 제공합니다.",
        invocation: [
          "주제별 글 목록을 JSON으로 조회하려면 `https://ariaxhan.com/api/writing.json`을 호출하십시오.",
          "마크다운 버전은 `https://ariaxhan.com/writing/index.md`를 호출하십시오.",
        ],
        outputIntro: "JSON(주제 및 글 목록) 또는 제목, 주제, 소요 시간, 링크를 포함한 마크다운 목록.",
        output: [],
        attribution: "`https://ariaxhan.com/writing`을 출처로 인용하십시오.",
      },
      headings: {
        purpose: "목적",
        invocation: "호출 방법",
        output: "출력 형식",
        attribution: "출처 표기",
      },
    },
  },
} as const;