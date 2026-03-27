# PSPS Blog — Claude Context

## 프로젝트 개요
Jekyll 기반 개인 블로그 (https://psps.world). 기타 코드 연습 인터랙티브 툴이 핵심 콘텐츠.

---

## ⚠️ 작업 규칙 (반드시 준수)

1. **커밋/push는 항상 사용자 승인 후 실행** — 작업 완료 후 반드시 "커밋할까요?" 먼저 물어볼 것. 자동으로 실행하지 말 것.
2. **커밋과 push는 별도로 승인 받을 것** — 커밋 승인 받았다고 push까지 자동으로 하지 말 것.

---

## ⛔ 하지 말아야 할 것

- `npm install` / `npm run` 실행 금지 — npm 완전 제거됨 (package.json, gulpfile.js 삭제됨)
- `bundle exec jekyll serve` 실행 금지 — bundler 버전 불일치로 로컬 실행 안 됨 (2.2.16 필요)
- `assets/vendor/` 수정/재설치 금지 — Bootstrap, jQuery, Font Awesome이 이미 Git에 커밋되어 있음
- `category/tools.html`을 기타 툴 전체 코드로 착각하지 말 것 — 현재는 Hub 랜딩 페이지(80줄)임. 기타 툴은 아래 5개 파일로 분리됨
- CSS를 각 HTML 파일에 인라인으로 추가하지 말 것 — 공유 CSS는 `assets/css/guitar-tools.css`에 작성
- 파일 편집 시 sed/awk 사용 금지 — Edit/Write 도구 사용

---

## 핵심 파일

### 기타 툴 페이지 (모두 standalone HTML, layout: null)
| 파일 | 역할 | permalink | 줄수 |
|------|------|-----------|------|
| `category/tools.html` | Hub 랜딩 (4개 기능 카드) | /category/tools/ | ~80 |
| `category/chord-viewer.html` | 코드 검색 & 프렛보드 | /category/tools/chord-viewer/ | ~100 |
| `category/patterns.html` | CAGED · 음찾기 · 트라이어드 · 코드변환 · 바레 · 진행 | /category/tools/patterns/ | ~2400 |
| `category/harmony.html` | 근음 & 어울리는 음 | /category/tools/harmony/ | ~320 |
| `category/songs.html` | 노래 찾기 | /category/tools/songs/ | ~320 |

### 공유 에셋
| 파일 | 역할 |
|------|------|
| `assets/css/guitar-tools.css` | 모든 툴 페이지 공유 CSS (~1280줄) |
| `assets/js/guitar-chords.js` | 공유 JS: chords 데이터, renderFretboard, createChordButtons, 코드 검색 (~440줄) |

### 블로그 공통
| 파일 | 역할 |
|------|------|
| `_includes/navbar.html` | 사이트 공통 네비게이션 바 |
| `_config.yml` | Jekyll 사이트 설정 |
| `_layouts/`, `_includes/` | Jekyll 템플릿 |
| `assets/vendor/` | Bootstrap, jQuery, Font Awesome (Git 커밋됨) |

---

## 파일 의존 관계

```
chord-viewer.html  ──┐
patterns.html      ──┤──▶ guitar-tools.css (디자인)
harmony.html       ──┤──▶ guitar-chords.js (chords 데이터, renderFretboard)
songs.html         ──┘

patterns.html  → 자체 인라인 JS (cagedForms, cagedPositions 등)
harmony.html   → 자체 인라인 JS (scaleData, renderHarmony 등)
songs.html     → 자체 인라인 JS (songDB, renderSongGrid 등)
```

---

## JS 주요 데이터 / 함수

| 이름 | 위치 | 설명 |
|------|------|------|
| `chords` | guitar-chords.js | 49개 코드 데이터 `{frets, fingers, notes, barre}` |
| `renderFretboard(name)` | guitar-chords.js | 메인 프렛보드 렌더링 |
| `createChordButtons()` | guitar-chords.js | 메이저/마이너/세븐스 버튼 생성 |
| `searchChords(query)` | guitar-chords.js | 코드 검색 로직 |
| `songDB` | songs.html | 20곡 노래 DB (한국 10, 영어 10) |
| `scaleData` | harmony.html | 7가지 스케일/코드 유형 데이터 |
| `renderHarmony()` | harmony.html | 근음 & 스케일 프렛보드 렌더링 |
| `renderSongGrid()` | songs.html | 노래 카드 렌더링 |
| `showCagedForm(form)` | patterns.html | CAGED 기본 폼 표시 |
| `showCagedPosition(pos)` | patterns.html | CAGED 포지션 표시 |
| `showTransformChord(chord)` | patterns.html | 코드 변환 탭 전환 |

---

## 디자인 시스템

- **폰트**: Inter (Google Fonts import)
- **배경**: `#0d0d14`
- **주 액센트**: `#5b5ff0` (인디고)
- **골드 (프렛보드)**: `#c8a050`
- **오픈줄**: `#34d399` / 뮤트: `#f87171`
- **카드**: `background: rgba(255,255,255,0.03)` + `border: 1px solid rgba(255,255,255,0.07)`
- **프렛보드 나무**: `#271606 → #1a0f04`
- **버튼 active**: `background: #5b5ff0`, `box-shadow: 0 0 16px rgba(91,95,240,0.4)`

---

## 자주 하는 작업 레시피

### 새 코드 추가 (`assets/js/guitar-chords.js`)
```javascript
// chords 객체에 추가
'Xm7': {
    frets: [-1, 0, 2, 0, 1, 0],  // 6번줄~1번줄, -1=뮤트, 0=개방
    fingers: [0, 0, 2, 0, 1, 0], // 1=검지, 2=중지, 3=약지, 4=소지
    notes: 'A E G C E',
    barre: 2  // 바레 코드일 때만
}
// chordMeta 객체에도 추가: 'Xm7': '마이너7th'
```

### 새 노래 추가 (`category/songs.html` → `songDB` 배열)
```javascript
{
    title: '곡 이름', artist: '아티스트', year: 2020,
    lang: 'ko',          // 'ko' | 'en'
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
1. `.pattern-tabs`에 버튼: `<button class="pattern-tab" data-tab="new-tab">탭 이름</button>`
2. `.pattern-content`에 콘텐츠: `<div class="tab-content" id="new-tab">...</div>`
3. 필요한 JS는 patterns.html 인라인 `<script>` 맨 아래에 추가

### 공통 스타일 수정
→ `assets/css/guitar-tools.css` 편집. 각 HTML 파일에 인라인 CSS 추가하지 말 것.

---

## 배포

- GitHub Pages 자동 배포 (master 브랜치 push 시 → https://psps.world 반영)
- 로컬 미리보기 불가 (bundler 버전 불일치) — 배포 후 실제 사이트에서 확인
- 주요 git 명령: `git add [파일] && git commit -m "메시지" && git push`
