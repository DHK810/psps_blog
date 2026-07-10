# PSPS 블로그 인터랙티브 팝아트 리디자인 — 설계 문서

날짜: 2026-07-09
브랜치: `redesign/interactive-pop`

## 배경

PSPS 블로그는 Jekyll `clean-blog-kr` 테마 기반의 정적 클래식 레이아웃을 사용 중이다. 기타 코드 툴 섹션(`category/chord-viewer.html` 등)은 이미 다크 인디고 톤의 완성도 높은 인터랙티브 스타일로 별도 구축되어 있으나, 블로그 본문(홈/포스트/카테고리/소개/문의)은 여전히 정적인 클래식 스타일이다.

이번 작업은 블로그 본문 전체를 새로운 인터랙티브 팝아트 디자인 시스템으로 리디자인한다. 기타 툴 섹션은 대상에서 제외한다.

## 범위

**포함**
- `_layouts/home.html`, `page.html`, `post.html`
- `_includes/head.html`, `scripts.html`
- `posts/index.html`, `category/1.html`(마케팅), `category/2.html`(해외 이슈), `category/3.html`(지식)
- 신규: `assets/css/psps-interactive.css`, `assets/js/psps-interactive.js`

**제외 (구현 중 판단으로 범위 축소, 이유 명시)**
- `_includes/navbar.html`, `footer.html` — 마크업 변경 없이 기존 클래스(`#mainNav`, `.nav-link`, `footer` 등)를 CSS 선택자로만 오버라이드. 마크업을 안 건드리므로 리스크 감소
- `about.html`, `contact.html` — `_layouts/page.html`을 공유하므로 브레드크럼/히어로 스타일을 레이아웃에서 한 번만 구현하면 자동 적용됨. 내용 자체 마크업 변경 불필요
- `category/tools.html`, `category/chord-viewer.html`, `category/patterns.html`, `category/harmony.html`, `category/songs.html`
- `assets/css/guitar-tools.css`, `assets/js/guitar-chords.js`
- `assets/vendor/` (수정 금지), `assets/scss/clean-blog.scss` 및 하위 scss (코어 테마 scss는 건드리지 않고 새 CSS 파일로 오버라이드)

## 비주얼 디자인 시스템 — "팝아트 스낵 무드"

### 색상
| 역할 | 값 |
|---|---|
| 배경(크림) | `#FFF8EC` |
| 잉크(아웃라인/텍스트) | `#1A1A1A` |
| 메인 액센트(핫핑크) | `#FF4D6D` |
| 서브 액센트(옐로) | `#FFD23F` |
| 서브 액센트(블루) | `#3D5AFE` |
| 서브 액센트(민트) | `#2EC4B6` |

카테고리 색상 코딩: 마케팅=핫핑크, 해외 이슈=블루, 지식=민트. 카테고리 슬러그는 포스트 프론트매터의 `categories`와 동일: `marketing`, `foreign_issue`, `knowledge`.

### 타이포그래피
- 헤드라인: Cafe24 Ssurround (국문 웹폰트, CDN)
- 본문: Pretendard — `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css` (공식 문서화된 CDN)
- Cafe24 Ssurround의 정확한 임베드 URL은 구현 시점에 `fonts.cafe24.com` 또는 noonnu.cc에서 재확인 필요(추측 금지 — 틀린 URL은 404로 조용히 실패해 폰트만 폴백되고 발견이 늦어짐)
- 두 폰트 모두 `font-display: swap` 전제 (jsdelivr로 서빙되는 pretendard.css는 이미 swap 적용됨을 확인)

### 조형 언어
- 카드/버튼: 두꺼운 검정 아웃라인 + 오프셋 드롭섀도우
- 호버: 카드가 살짝 회전(-1~2deg)하며 그림자가 커짐
- 헤더: halftone 도트 텍스처 배경
- 카테고리 배지: 스티커 형태, 카테고리별 색상
- 버튼 클릭: 그림자가 눌리며 축소

목업 아티팩트로 검증 완료 (사용자 승인됨).

## 페이지/컴포넌트 설계

- **네비바/푸터**: CSS만으로 재스타일 (마크업 불변)
- **홈 히어로**: `.masthead` CSS로 회전 헤드라인 + halftone 배경 (레이아웃 공통 규칙, 마크업 불변)
- **포스트 카드** (홈/전체글/카테고리 공통): 카테고리 배지, alt 텍스트, lazy-load, `psps-reveal` 스크롤 등장 애니메이션, `data-cat` 속성
- **카테고리 필터 필**: `posts/index.html`(전체 글)에만 추가. 모든 카드는 HTML에 그대로 렌더링되고 JS는 `display`만 토글 (SEO 영향 없음)
- **브레드크럼**: `_layouts/page.html`(전체 글/카테고리/소개/문의 공통)과 `_layouts/post.html`(포스트 전용, Home > 카테고리 > 제목)에 각각 구현 + `BreadcrumbList` JSON-LD
- **포스트 상세**: 스크롤 진행바(`#psps-progress`), `BlogPosting` JSON-LD, 브레드크럼
- **스크롤 리빌**: `psps-reveal` 클래스 + IntersectionObserver, JS 비활성 시에도 콘텐츠가 즉시 보이는 progressive enhancement 방식(`<html class="js">` 훅으로 구현 — JS 없으면 애니메이션 자체가 적용 안 되고 항상 보임)

## SEO 보강

| 항목 | 조치 |
|---|---|
| 이미지 alt | 빈 alt(`alt=""`) 제거, `post.title`로 채움 |
| 구조화 데이터 | `post.html`에 `BlogPosting`, `page.html`/`post.html`에 `BreadcrumbList`, `head.html`에 `WebSite` JSON-LD |
| 웹폰트 성능 | Pretendard는 jsdelivr CDN(swap 적용), Cafe24 Ssurround는 구현 시 정확한 CDN 확인 후 `font-display: swap` 명시 |
| 카테고리 필터 | 전체 카드 HTML 렌더링 + JS는 표시/숨김만 토글, 개별 카테고리 URL 유지 |
| 헤딩 구조 | `posts/index.html`의 `h3.post-subtitle`을 다른 페이지와 동일한 `h4`로 통일 |
| 브레드크럼 | 위 참조 |
| 이미지 lazy-load | 리스트 첫 카드 제외하고 `loading="lazy"` |

**유지 (건드리지 않음)**: OG/Twitter 메타, canonical, sitemap.xml, robots.txt, feed.xml, 서치콘솔 인증, GTM/GA4/메일침프 트래킹.

## 배포 및 검증 계획

로컬 Jekyll 빌드 불가 환경이므로:
1. `redesign/interactive-pop` 브랜치에서 작업, 태스크별 커밋
2. 브랜치 push (master 아님 — 자동 배포 트리거 없음)
3. 사용자 diff 리뷰
4. 승인 시 master 병합 → push (별도 승인 필수)
5. 배포 직후 실사이트 확인, 문제 시 즉시 revert

## 리스크 및 롤백

- 폰트 CDN 장애 시에도 시스템 폰트 폴백로 가독성 유지
- 새 CSS/JS는 독립 파일이므로 `head.html`/`scripts.html`의 참조 라인만 되돌리면 `.psps-reveal` 대상 콘텐츠가 CSS 없이 전부 기본 노출(opacity 기본값)로 돌아와 가독성은 즉시 복구됨 (특히 이번 수정으로 `post.html`/`page.html`의 전체 본문 래핑을 제거한 뒤이므로, 참조 라인만 되돌려도 스크롤리빌 관련 노출 문제는 발생하지 않음)
- 다만 이 참조 라인 되돌리기만으로는 브레드크럼 내비게이션 텍스트, 카테고리 뱃지 텍스트, 필터 필(filter-pill) 로우 등 템플릿에 추가된 마크업 자체는 제거되지 않음 — 이는 CSS/JS 참조가 아니라 레이아웃/인클루드 파일의 마크업 변경이기 때문. 즉 참조 라인 롤백은 "가독성 복구"만 보장하며 "클래식 테마로의 완전 복귀"는 보장하지 않음
- 리디자인 이전의 클래식 테마로 완전히 되돌리려면 이 브랜치의 커밋들을 `git revert`하거나, 이전 `master`를 그대로 재배포하는 방법이 정확한 롤백 절차임
- 기타 코드 툴 섹션은 무관
