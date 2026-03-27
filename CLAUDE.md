# PSPS Blog — Claude Context

## 프로젝트 개요
Jekyll 기반 개인 블로그. 기타 코드 연습 인터랙티브 툴이 핵심 콘텐츠.

## 핵심 파일
- **`category/tools.html`** — Hub 랜딩 페이지 (permalink: /category/tools/)
- **`category/chord-viewer.html`** — 코드 검색 & 프렛보드 시각화 (permalink: /category/tools/chord-viewer/)
- **`category/patterns.html`** — CAGED · 음 찾기 · 트라이어드 · 코드 변환 · 바레 · 진행 (permalink: /category/tools/patterns/)
- **`category/harmony.html`** — 근음 & 어울리는 음 (permalink: /category/tools/harmony/)
- **`category/songs.html`** — 노래 찾기 (permalink: /category/tools/songs/)
- **`assets/css/guitar-tools.css`** — 공유 CSS (모든 툴 페이지에서 사용)
- **`assets/js/guitar-chords.js`** — 공유 JS (chords 데이터, renderFretboard, createChordButtons, 코드 검색)
- **`_config.yml`** — 사이트 설정
- **`_layouts/`, `_includes/`** — Jekyll 템플릿
- **`assets/vendor/`** — Bootstrap, jQuery, Font Awesome (Git에 커밋됨, npm 불필요)

## 파일 구조 및 역할

### `assets/css/guitar-tools.css`
모든 툴 페이지가 공유하는 CSS. 원래 tools.html의 `<style>` 블록 전체를 추출.

### `assets/js/guitar-chords.js`
모든 툴 페이지가 공유하는 JS:
- `const chords` — 49개 코드 데이터 `{frets, fingers, notes, barre}`
- `const fingerNames`, `const stringNames`
- `function renderFretboard(chordName)` — 메인 프렛보드 렌더링
- `function createChordButtons()` — 메이저/마이너/세븐스 버튼 생성
- `const chordMeta`, `const flatMap`, `normalizeChordInput`, `searchChords` — 코드 검색
- 검색 이벤트 리스너 (searchInput/suggestionsBox 존재 여부 확인 후 실행)

### `category/tools.html` — Hub
4개 기능 카드 랜딩 페이지. CSS만 필요, JS 없음.

### `category/chord-viewer.html` — 코드 뷰어
- guitar-chords.js 로드
- 코드 검색, 코드 버튼 선택, 프렛보드 시각화, legend

### `category/patterns.html` — 코드 암기 패턴
- guitar-chords.js 로드
- 인라인 JS: `cagedForms`, `cagedPositions`, `renderCagedFretboard`, `showCagedForm`, `showCagedPosition`, `showTransformChord`, 패턴 탭 전환
- 초기화: `showCagedPosition('C')`, `showTransformChord('E')`
- 탭: CAGED 시스템, 음 찾기, 트라이어드, 코드 변환, 바레 코드, 코드 진행

### `category/harmony.html` — 근음 & 어울리는 음
- guitar-chords.js 로드
- 인라인 JS: `allNotes`, `scaleData`, `openStringNotes`, `stringLabels`, `selectedRoot`, `selectedScaleType`, `initRootNoteSelector`, `selectRoot`, `selectScaleType`, `renderHarmony`, `renderHarmonyFretboard`, `renderStringMaps`, `renderOneStringMap`
- 초기화: `initRootNoteSelector()`

### `category/songs.html` — 노래 찾기
- guitar-chords.js 로드
- 인라인 JS: `songDB`, `songFilterLang`, `songFilterDiff`, `songSearchQuery`, `renderSongGrid`, `loadSongChord`, 필터/검색 이벤트
- 초기화: `renderSongGrid()`
- 코드 클릭 시 페이지 하단 프렛보드 팝업 표시 (songChordSection)

## JS 주요 데이터 / 함수
| 이름 | 위치 | 설명 |
|------|------|------|
| `chords` | guitar-chords.js | 49개 코드 데이터 `{frets, fingers, notes, barre}` |
| `songDB` | songs.html | 20곡 노래 DB (한국 10, 영어 10) |
| `scaleData` | harmony.html | 7가지 스케일/코드 유형 데이터 |
| `renderFretboard(name)` | guitar-chords.js | 메인 프렛보드 렌더링 |
| `renderHarmony()` | harmony.html | 근음 & 어울리는 음 프렛보드 렌더링 |
| `renderSongGrid()` | songs.html | 노래 찾기 카드 렌더링 |
| `loadSongChord(name)` | songs.html | 노래 카드에서 코드 클릭 시 프렛보드 연동 |
| `initRootNoteSelector()` | harmony.html | 근음 탭 초기화 |
| `showCagedForm(form)` | patterns.html | CAGED 기본 폼 표시 |
| `showCagedPosition(pos)` | patterns.html | CAGED 포지션 표시 |
| `showTransformChord(chord)` | patterns.html | 코드 변환 탭 전환 |

## 디자인 시스템
- **폰트**: Inter (Google Fonts)
- **배경**: `#0d0d14`
- **주 액센트**: `#5b5ff0` (인디고)
- **골드 (프렛보드)**: `#c8a050`
- **오픈줄**: `#34d399` / 뮤트: `#f87171`
- **카드**: `rgba(255,255,255,0.03)` + `border: rgba(255,255,255,0.07)`
- **프렛보드 나무**: `#271606 → #1a0f04`

## 코드 추가 방법

### 새 코드 추가 (`chords` 객체, `assets/js/guitar-chords.js`)
```javascript
'Xm7': {
    frets: [-1, 0, 2, 0, 1, 0],  // 6번줄~1번줄, -1=뮤트, 0=개방
    fingers: [0, 0, 2, 0, 1, 0], // 손가락 번호 (1=검지 ~ 4=소지)
    notes: 'A E G C E',
    barre: 2  // 바레 코드일 때만 (프렛 번호)
}
```
`chordMeta` 객체에도 추가 필요.

### 새 노래 추가 (`songDB` 배열, `category/songs.html`)
```javascript
{
    title: '곡 이름', artist: '아티스트', year: 2020,
    lang: 'ko',  // 'ko' | 'en'
    genre: '인디팝',
    key: 'G장조', capo: 0,
    progression: ['G','Em','C','D'],
    bpm: 100,
    difficulty: '초급',  // '초급' | '초중급' | '중급' | '고급'
    range: 'C4 ~ E5',
    tip: '팁 내용'
}
```

### 새 패턴 탭 추가 (`category/patterns.html`)
1. `.pattern-tabs`에 버튼 추가: `<button class="pattern-tab" data-tab="new-tab">탭 이름</button>`
2. `.pattern-content` 안에 콘텐츠 추가: `<div class="tab-content" id="new-tab">...</div>`
3. 필요한 JS는 patterns.html 인라인 `<script>`에 추가

## 배포
- GitHub Pages 자동 배포 (master 브랜치 push 시)
- `git add assets/ category/ CLAUDE.md && git commit && git push`
- `node_modules`, `package.json`, `gulpfile.js` 삭제됨 — npm 불필요
- Gemfile/Ruby 환경 없어도 standalone HTML 파일들은 독립 실행 가능
