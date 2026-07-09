# PSPS 블로그 인터랙티브 팝아트 리디자인 — 설계 문서

날짜: 2026-07-09
브랜치: `redesign/interactive-pop`

## 배경

PSPS 블로그는 Jekyll `clean-blog-kr` 테마 기반의 정적 클래식 레이아웃을 사용 중이다. 기타 코드 툴 섹션(`category/chord-viewer.html` 등)은 이미 다크 인디고 톤의 완성도 높은 인터랙티브 스타일로 별도 구축되어 있으나, 블로그 본문(홈/포스트/카테고리/소개/문의)은 여전히 정적인 클래식 스타일이다.

이번 작업은 블로그 본문 전체를 새로운 인터랙티브 팝아트 디자인 시스템으로 리디자인한다. 기타 툴 섹션은 대상에서 제외한다.

## 범위

**포함**
- `_layouts/home.html`, `page.html`, `post.html`
- `_includes/navbar.html`, `head.html`, `scripts.html`, `footer.html`
- `posts/index.html`, `category/1.html`(마케팅), `category/2.html`(해외 이슈), `category/3.html`(지식)
- `about.html`, `contact.html`
- 신규: `assets/css/psps-interactive.css`, `assets/js/psps-interactive.js`

**제외**
- `category/tools.html`, `category/chord-viewer.html`, `category/patterns.html`, `category/harmony.html`, `category/songs.html`
- `assets/css/guitar-tools.css`, `assets/js/guitar-chords.js`
- `assets/vendor/` (Bootstrap, jQuery, Font Awesome — 수정 금지)
- `assets/scss/clean-blog.scss` 및 하위 scss 파일 (코어 테마 scss는 건드리지 않고, 새 CSS 파일로 오버라이드하는 기존 검증된 패턴을 따름 — 로컬 Jekyll 빌드가 불가능한 환경에서 코어 scss 직접 수정은 위험도가 높음)

## 비주얼 디자인 시스템 — "팝아트 스낵 무드"

PSPS 브랜드 카피("먹기 좋게 뿌셔 먹는 마케팅")에서 착안한 스낵/크런치 감성의 네오브루탈리즘 팝아트.

### 색상
| 역할 | 값 |
|---|---|
| 배경(크림) | `#FFF8EC` |
| 잉크(아웃라인/텍스트) | `#1A1A1A` |
| 메인 액센트(핫핑크) | `#FF4D6D` |
| 서브 액센트(옐로) | `#FFD23F` |
| 서브 액센트(블루) | `#3D5AFE` |
| 서브 액센트(민트) | `#2EC4B6` |

카테고리 색상 코딩: 마케팅=핫핑크, 해외 이슈=블루, 지식=민트.

### 타이포그래피
- 헤드라인: Cafe24 Ssurround (국문 웹폰트, CDN 로드)
- 본문: Pretendard (기존 Open Sans/Lora 대체)
- 두 폰트 모두 `font-display: swap` + `preconnect`/필요 굵기만 로드하여 CWV(LCP) 저하 방지

### 조형 언어
- 카드/버튼: 두꺼운 검정 아웃라인 + 오프셋 드롭섀도우(`6px 6px 0 #1A1A1A`)
- 호버: 카드가 살짝 회전(-1~2deg)하며 그림자가 커짐(들뜨는 느낌)
- 헤더: halftone 도트 텍스처 배경
- 카테고리 배지: 스티커/찢어진 종이 형태
- 버튼 클릭: 그림자가 눌리며 축소(촉각적 프레스 모션)

목업으로 검증 완료 (아티팩트 미리보기 승인됨).

## 페이지/컴포넌트 설계

- **네비바**: 스티키, 알약형 링크, 호버 시 배경 채움 애니메이션
- **홈 히어로**: 회전된 대형 헤드라인 + halftone 배경 + 스티커 배지 태그라인
- **포스트 카드** (홈/전체글/카테고리 공통): 두꺼운 테두리 + 오프셋 섀도우, 카테고리 색상 코딩된 썸네일/배지, 호버 시 회전+확대 섀도우
- **카테고리 필터 필**: `posts/index.html`(전체 글)에 필터 pill 바 추가. 모든 카드는 HTML에 그대로 렌더링되고 JS는 `display`만 토글하는 프로그레시브 인핸스먼트 방식(SEO 크롤링 영향 없음). 기존 `/category/*` 개별 URL도 그대로 유지
- **포스트 상세**: 스크롤 진행바(상단 고정, 액센트 그라데이션), 브레드크럼, 인용구/이미지 스타일 재정비, 이전/다음 글 버튼을 팝아트 버튼으로 교체
- **소개/문의**: 스티커 배지 타이틀, 폼 필드 두꺼운 테두리 + 포커스 컬러, 제출 버튼 프레스 모션
- **스크롤 리빌**: IntersectionObserver로 카드/섹션 fade-up 스태거 애니메이션

## SEO 보강

| 항목 | 조치 |
|---|---|
| 이미지 alt | 빈 alt(`alt=""`) 전부 제거, 포스트 title/description으로 자동 채움 |
| 구조화 데이터 | `post.html`에 `BlogPosting` JSON-LD, 카테고리 페이지에 `BreadcrumbList`, 공통 레이아웃에 `WebSite`/`Organization` 스키마 추가 |
| 웹폰트 성능 | `font-display: swap`, `preconnect`, 필요 굵기만 로드 |
| 카테고리 필터 | 전체 카드 HTML 렌더링 + JS는 표시/숨김만 토글 (크롤러 영향 없음), 개별 카테고리 URL 유지 |
| 헤딩 구조 | 포스트 상세 h1 1개 유지, 리스트류 post-title은 h2로 통일 (현재 일부 h3 혼재 수정) |
| 브레드크럼 | 포스트/카테고리 페이지 상단에 팝아트 스타일 브레드크럼 추가 |
| 이미지 lazy-load | 리스트 두 번째 카드부터 `loading="lazy"` (첫 카드는 LCP 대상이라 제외) |

**유지 (건드리지 않음)**: OG/Twitter 메타, canonical, sitemap.xml, robots.txt, feed.xml, 구글/네이버 서치콘솔 인증, GTM/GA4/메일침프 트래킹 스크립트.

## 배포 및 검증 계획

로컬 Jekyll 빌드가 불가능한 환경(bundler 버전 불일치)이므로 다음 순서로 진행한다.

1. `redesign/interactive-pop` 브랜치에서 전체 작업, 단계별 커밋 (사용자 승인 후)
2. 브랜치 push (master가 아님 — GitHub Pages 자동 배포 트리거 없음)
3. 사용자가 GitHub 상에서 diff 리뷰 (또는 원할 경우 Pages 설정을 브랜치로 임시 전환해 실 배포 미리보기)
4. 승인 시 master로 병합 → push (실제 사이트 반영) — **이 단계는 반드시 별도 승인**
5. 배포 직후 실사이트(psps.world) 확인, 문제 발견 시 이전 커밋으로 즉시 revert

## 리스크 및 롤백

- 웹폰트 CDN 장애 시에도 `font-display: swap`으로 본문 가독성은 유지됨 (시스템 폰트 폴백)
- 새 CSS/JS 파일은 독립적으로 추가되므로, 문제가 생기면 `head.html`/`scripts.html`의 참조 라인만 되돌려도 기존 클래식 테마로 즉시 복귀 가능
- 기타 코드 툴 섹션은 이번 변경과 무관하므로 영향 없음
