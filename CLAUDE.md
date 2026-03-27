# PSPS Blog — Claude Context

## 프로젝트 개요
Jekyll 기반 개인 블로그. 기타 코드 연습 인터랙티브 툴이 핵심 콘텐츠.

## 핵심 파일
- **`category/tools.html`** — 기타 코드 연습 툴 전체 (단일 파일, ~4600줄)
  - Jekyll layout 없이 standalone HTML
  - CSS / HTML / JS 모두 이 파일 안에 포함
- **`_config.yml`** — 사이트 설정
- **`_layouts/`, `_includes/`** — Jekyll 템플릿
- **`assets/vendor/`** — Bootstrap, jQuery, Font Awesome (Git에 커밋됨, npm 불필요)

## tools.html 구조
```
lines 1–11     : head (meta, title, favicon)
lines 12–1126  : <style> CSS 블록
lines 1127–    : <body>
  .tool-nav          : 상단 네비게이션 바
  .chord-search      : 코드 검색창 (실시간 자동완성)
  .chord-selector    : 메이저/마이너/세븐스 코드 버튼
  .chord-display     : 프렛보드 시각화 영역
  .legend            : 기호 설명
  .pattern-section   : 탭 기반 학습 섹션
    #caged            : CAGED 시스템
    #fretboard-notes  : 음 찾기
    #triad            : 트라이어드
    #transform        : 코드 변환 (E/A/D/C/G형)
    #barre            : 바레 코드
    #progression      : 코드 진행
    #root-harmony     : 근음 & 어울리는 음 (인터랙티브)
    #song-search      : 노래 찾기 (곡 DB 검색)
lines ~3909–   : <script> JS 블록
```

## JS 주요 데이터 / 함수
| 이름 | 설명 |
|------|------|
| `chords` | 49개 코드 데이터 `{frets, fingers, notes, barre}` |
| `songDB` | 20곡 노래 DB (한국 10, 영어 10) |
| `scaleData` | 7가지 스케일/코드 유형 데이터 |
| `renderFretboard(name)` | 메인 프렛보드 렌더링 |
| `renderHarmony()` | 근음 & 어울리는 음 프렛보드 렌더링 |
| `renderSongGrid()` | 노래 찾기 카드 렌더링 |
| `loadSongChord(name)` | 노래 카드에서 코드 클릭 시 프렛보드 연동 |
| `initRootNoteSelector()` | 근음 탭 초기화 |
| `showCagedForm(form)` | CAGED 기본 폼 표시 |
| `showCagedPosition(pos)` | CAGED 포지션 표시 |
| `showTransformChord(chord)` | 코드 변환 탭 전환 |

## 디자인 시스템
- **폰트**: Inter (Google Fonts)
- **배경**: `#0d0d14`
- **주 액센트**: `#5b5ff0` (인디고)
- **골드 (프렛보드)**: `#c8a050`
- **오픈줄**: `#34d399` / 뮤트: `#f87171`
- **카드**: `rgba(255,255,255,0.03)` + `border: rgba(255,255,255,0.07)`
- **프렛보드 나무**: `#271606 → #1a0f04`

## 코드 추가 방법

### 새 코드 추가 (`chords` 객체)
```javascript
'Xm7': {
    frets: [-1, 0, 2, 0, 1, 0],  // 6번줄~1번줄, -1=뮤트, 0=개방
    fingers: [0, 0, 2, 0, 1, 0], // 손가락 번호 (1=검지 ~ 4=소지)
    notes: 'A E G C E',
    barre: 2  // 바레 코드일 때만 (프렛 번호)
}
```

### 새 노래 추가 (`songDB` 배열)
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

### 새 탭 추가
1. `.pattern-tabs`에 버튼 추가: `<button class="pattern-tab" data-tab="new-tab">탭 이름</button>`
2. `.pattern-content` 안에 콘텐츠 추가: `<div class="tab-content" id="new-tab">...</div>`
3. JS 초기화 필요시 `initRootNoteSelector()` 아래에 추가

## 배포
- GitHub Pages 자동 배포 (master 브랜치 push 시)
- `git add category/tools.html && git commit && git push`
- `node_modules`, `package.json`, `gulpfile.js` 삭제됨 — npm 불필요
- Gemfile/Ruby 환경 없어도 tools.html은 독립 실행 가능
