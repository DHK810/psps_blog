        // 코드 데이터: [6번줄(E), 5번줄(A), 4번줄(D), 3번줄(G), 2번줄(B), 1번줄(e)]
        // 숫자 = 프렛 번호, 0 = 열린 줄, -1 = 뮤트
        // fingers: 각 줄에 사용할 손가락 (1=검지, 2=중지, 3=약지, 4=소지)
        const chords = {
            // 메이저 코드
            'C': {
                frets: [-1, 3, 2, 0, 1, 0],
                fingers: [0, 3, 2, 0, 1, 0],
                notes: 'C E G C E'
            },
            'D': {
                frets: [-1, -1, 0, 2, 3, 2],
                fingers: [0, 0, 0, 1, 3, 2],
                notes: 'D A D F#'
            },
            'E': {
                frets: [0, 2, 2, 1, 0, 0],
                fingers: [0, 2, 3, 1, 0, 0],
                notes: 'E B E G# B E'
            },
            'F': {
                frets: [1, 3, 3, 2, 1, 1],
                fingers: [1, 3, 4, 2, 1, 1],
                notes: 'F C F A C F',
                barre: 1
            },
            'G': {
                frets: [3, 2, 0, 0, 0, 3],
                fingers: [2, 1, 0, 0, 0, 3],
                notes: 'G B D G B G'
            },
            'A': {
                frets: [-1, 0, 2, 2, 2, 0],
                fingers: [0, 0, 1, 2, 3, 0],
                notes: 'A E A C# E'
            },
            'B': {
                frets: [-1, 2, 4, 4, 4, 2],
                fingers: [0, 1, 2, 3, 4, 1],
                notes: 'B F# B D# F#',
                barre: 2
            },

            // 마이너 코드
            'Cm': {
                frets: [-1, 3, 5, 5, 4, 3],
                fingers: [0, 1, 3, 4, 2, 1],
                notes: 'C G C Eb G',
                barre: 3
            },
            'Dm': {
                frets: [-1, -1, 0, 2, 3, 1],
                fingers: [0, 0, 0, 2, 3, 1],
                notes: 'D A D F'
            },
            'Em': {
                frets: [0, 2, 2, 0, 0, 0],
                fingers: [0, 2, 3, 0, 0, 0],
                notes: 'E B E G B E'
            },
            'Fm': {
                frets: [1, 3, 3, 1, 1, 1],
                fingers: [1, 3, 4, 1, 1, 1],
                notes: 'F C F Ab C F',
                barre: 1
            },
            'Gm': {
                frets: [3, 5, 5, 3, 3, 3],
                fingers: [1, 3, 4, 1, 1, 1],
                notes: 'G D G Bb D G',
                barre: 3
            },
            'Am': {
                frets: [-1, 0, 2, 2, 1, 0],
                fingers: [0, 0, 2, 3, 1, 0],
                notes: 'A E A C E'
            },
            'Bm': {
                frets: [-1, 2, 4, 4, 3, 2],
                fingers: [0, 1, 3, 4, 2, 1],
                notes: 'B F# B D F#',
                barre: 2
            },

            // 세븐스 코드
            'C7': {
                frets: [-1, 3, 2, 3, 1, 0],
                fingers: [0, 3, 2, 4, 1, 0],
                notes: 'C E Bb C E'
            },
            'D7': {
                frets: [-1, -1, 0, 2, 1, 2],
                fingers: [0, 0, 0, 2, 1, 3],
                notes: 'D A C F#'
            },
            'E7': {
                frets: [0, 2, 0, 1, 0, 0],
                fingers: [0, 2, 0, 1, 0, 0],
                notes: 'E B D G# B E'
            },
            'F7': {
                frets: [1, 3, 1, 2, 1, 1],
                fingers: [1, 3, 1, 2, 1, 1],
                notes: 'F C Eb A C F',
                barre: 1
            },
            'G7': {
                frets: [3, 2, 0, 0, 0, 1],
                fingers: [3, 2, 0, 0, 0, 1],
                notes: 'G B D G B F'
            },
            'A7': {
                frets: [-1, 0, 2, 0, 2, 0],
                fingers: [0, 0, 1, 0, 2, 0],
                notes: 'A E G C# E'
            },
            'B7': {
                frets: [-1, 2, 1, 2, 0, 2],
                fingers: [0, 2, 1, 3, 0, 4],
                notes: 'B D# A B F#'
            },

            // 메이저 7th
            'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], notes: 'C E G B E' },
            'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 2, 3], notes: 'D A C# F#' },
            'Emaj7': { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0], notes: 'E B D# G# B E' },
            'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], notes: 'F A C E' },
            'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], notes: 'G B D G B F#' },
            'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], notes: 'A E G# C# E' },
            'Bmaj7': { frets: [-1, 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1], notes: 'B F# B D# F#', barre: 2 },

            // 마이너 7th
            'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], notes: 'A E G C E' },
            'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2], notes: 'D A C F' },
            'Em7': { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 1, 0, 0, 0, 0], notes: 'E B D G B E' },
            'Fm7': { frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1], notes: 'F C Eb Ab C F', barre: 1 },
            'Gm7': { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], notes: 'G D F Bb D G', barre: 3 },
            'Bm7': { frets: [-1, 2, 4, 2, 3, 2], fingers: [0, 1, 3, 1, 2, 1], notes: 'B F# A D F#', barre: 2 },
            'Cm7': { frets: [-1, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1], notes: 'C G Bb Eb G', barre: 3 },

            // sus 코드
            'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], notes: 'D A E A' },
            'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4], notes: 'D A D G' },
            'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], notes: 'A E B E' },
            'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], notes: 'A E A D E' },
            'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], notes: 'E B E A B E' },
            'Gsus4': { frets: [3, -1, 0, 0, 1, 3], fingers: [2, 0, 0, 0, 1, 3], notes: 'G D G C G' },

            // add9 코드
            'Cadd9': { frets: [-1, 3, 2, 0, 3, 0], fingers: [0, 3, 2, 0, 4, 0], notes: 'C E G D E' },
            'Gadd9': { frets: [3, 2, 0, 2, 0, 3], fingers: [2, 1, 0, 3, 0, 4], notes: 'G B D A B G' },
            'Dadd9': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], notes: 'D A E A' },
            'Eadd9': { frets: [0, 2, 2, 1, 0, 2], fingers: [0, 2, 3, 1, 0, 4], notes: 'E B E G# B F#' },

            // 파워 코드
            'E5': { frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, 0, 0, 0], notes: 'E B E' },
            'A5': { frets: [-1, 0, 2, 2, -1, -1], fingers: [0, 0, 1, 2, 0, 0], notes: 'A E A' },
            'D5': { frets: [-1, -1, 0, 2, 3, -1], fingers: [0, 0, 0, 1, 3, 0], notes: 'D A D' },
            'G5': { frets: [3, 5, 5, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], notes: 'G D G' },
            'C5': { frets: [-1, 3, 5, 5, -1, -1], fingers: [0, 1, 3, 4, 0, 0], notes: 'C G C' },
            'F5': { frets: [1, 3, 3, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], notes: 'F C F' },
            'B5': { frets: [-1, 2, 4, 4, -1, -1], fingers: [0, 1, 3, 4, 0, 0], notes: 'B F# B' }
        };

        const fingerNames = ['', '검지(1)', '중지(2)', '약지(3)', '소지(4)'];
        const stringNames = ['6번줄(E)', '5번줄(A)', '4번줄(D)', '3번줄(G)', '2번줄(B)', '1번줄(e)'];

        function renderFretboard(chordName) {
            const chord = chords[chordName];
            if (!chord) return;

            const { frets, fingers, notes, barre } = chord;

            // 프렛 범위 계산
            const maxFret = Math.max(...frets.filter(f => f > 0));
            const minFret = Math.min(...frets.filter(f => f > 0));
            const startFret = minFret > 3 ? minFret - 1 : 1;
            const endFret = Math.max(startFret + 3, maxFret);

            // 열린줄/뮤트 표시
            const openMuteRow = document.getElementById('openMuteRow');
            openMuteRow.innerHTML = '<span></span>';
            for (let i = 0; i < 6; i++) {
                const span = document.createElement('span');
                if (frets[i] === -1) {
                    span.textContent = '✕';
                    span.className = 'mute';
                } else if (frets[i] === 0) {
                    span.textContent = '○';
                    span.className = 'open';
                }
                openMuteRow.appendChild(span);
            }

            // 너트 표시 (1프렛 시작이면 너트 표시)
            const nutRow = document.getElementById('nutRow');
            if (startFret === 1) {
                nutRow.style.display = 'grid';
            } else {
                nutRow.style.display = 'none';
            }

            // 프렛보드 그리드 생성
            const grid = document.getElementById('fretboardGrid');
            grid.innerHTML = '';

            for (let f = startFret; f <= endFret; f++) {
                const fretRow = document.createElement('div');
                fretRow.className = 'fret-row';

                // 프렛 마커 (3, 5, 7, 9, 12프렛)
                if ([3, 5, 7, 9, 12, 15].includes(f)) {
                    fretRow.classList.add('has-marker');
                }

                // 프렛 번호
                const fretNum = document.createElement('div');
                fretNum.className = 'fret-number';
                fretNum.textContent = f;
                fretRow.appendChild(fretNum);

                // 6개의 줄
                for (let s = 0; s < 6; s++) {
                    const cell = document.createElement('div');
                    cell.className = `string-cell s${6-s}`;

                    if (frets[s] === f) {
                        const dot = document.createElement('div');
                        dot.className = 'finger-dot';
                        dot.textContent = fingers[s] || '';
                        cell.appendChild(dot);
                    }

                    fretRow.appendChild(cell);
                }

                grid.appendChild(fretRow);
            }

            document.getElementById('chordName').textContent = chordName;

            // 운지법 안내
            let fingerGuide = '';
            const usedFingers = {};

            for (let s = 0; s < 6; s++) {
                if (frets[s] > 0 && fingers[s] > 0) {
                    const key = fingers[s];
                    if (!usedFingers[key]) {
                        usedFingers[key] = [];
                    }
                    usedFingers[key].push(`${stringNames[s]} ${frets[s]}프렛`);
                }
            }

            let guideHTML = '';
            for (let f = 1; f <= 4; f++) {
                if (usedFingers[f]) {
                    guideHTML += `<div class="finger-item"><b>${fingerNames[f]}</b>: ${usedFingers[f].join(', ')}</div>`;
                }
            }

            if (barre) {
                guideHTML += `<div class="finger-item" style="color:#f4d03f"><b>바레(Barre)</b>: 검지로 ${barre}프렛 전체를 누름</div>`;
            }

            guideHTML += `<div class="finger-item" style="margin-top:10px;color:#aaa"><b>구성음</b>: ${notes}</div>`;

            document.getElementById('fingerGuide').innerHTML = guideHTML;
            document.getElementById('chordInfo').style.display = 'block';

            // 버튼 활성화 상태
            document.querySelectorAll('.chord-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.chord === chordName);
            });
        }

        function createChordButtons() {
            const majorChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const minorChords = ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'];
            const seventhChords = ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'];

            function addButtons(containerId, chordList) {
                const container = document.getElementById(containerId);
                if (!container) return;
                chordList.forEach(chord => {
                    const btn = document.createElement('button');
                    btn.className = 'chord-btn';
                    btn.textContent = chord;
                    btn.dataset.chord = chord;
                    btn.onclick = () => renderFretboard(chord);
                    container.appendChild(btn);
                });
            }

            addButtons('majorChords', majorChords);
            addButtons('minorChords', minorChords);
            addButtons('seventhChords', seventhChords);
        }

        // 초기화
        createChordButtons();

        // ===== 코드 검색 =====
        // 코드 메타 정보
        const chordMeta = {
            // 기본
            'C':'메이저','D':'메이저','E':'메이저','F':'메이저','G':'메이저','A':'메이저','B':'메이저',
            'Cm':'마이너','Dm':'마이너','Em':'마이너','Fm':'마이너','Gm':'마이너','Am':'마이너','Bm':'마이너',
            'C7':'7th','D7':'7th','E7':'7th','F7':'7th','G7':'7th','A7':'7th','B7':'7th',
            // 확장
            'Cmaj7':'메이저7th','Dmaj7':'메이저7th','Emaj7':'메이저7th','Fmaj7':'메이저7th',
            'Gmaj7':'메이저7th','Amaj7':'메이저7th','Bmaj7':'메이저7th',
            'Am7':'마이너7th','Dm7':'마이너7th','Em7':'마이너7th','Fm7':'마이너7th',
            'Gm7':'마이너7th','Bm7':'마이너7th','Cm7':'마이너7th',
            'Dsus2':'sus2','Asus2':'sus2','Dsus4':'sus4','Asus4':'sus4','Esus4':'sus4','Gsus4':'sus4',
            'Cadd9':'add9','Gadd9':'add9','Dadd9':'add9','Eadd9':'add9',
            'E5':'파워','A5':'파워','D5':'파워','G5':'파워','C5':'파워','F5':'파워','B5':'파워'
        };

        // 플랫 표기 → 샵 표기 변환 (예: Bb → A#)
        const flatMap = {
            'Bb':'A#','Cb':'B','Db':'C#','Eb':'D#','Fb':'E','Gb':'F#','Ab':'G#'
        };

        function normalizeChordInput(input) {
            input = input.trim();
            if (!input) return input;
            // 첫 글자 대문자
            input = input.charAt(0).toUpperCase() + input.slice(1);
            // 플랫 변환: 루트음 부분만
            for (const [flat, sharp] of Object.entries(flatMap)) {
                if (input.startsWith(flat)) {
                    input = sharp + input.slice(flat.length);
                    break;
                }
            }
            return input;
        }

        function searchChords(query) {
            if (!query) return [];
            const q = normalizeChordInput(query).toLowerCase();
            const allKeys = Object.keys(chords);
            // 정확히 시작하는 것 우선, 그 다음 포함
            const startsWith = allKeys.filter(k => k.toLowerCase().startsWith(q));
            const contains = allKeys.filter(k => !k.toLowerCase().startsWith(q) && k.toLowerCase().includes(q));
            return [...startsWith, ...contains].slice(0, 8);
        }

        const searchInput = document.getElementById('chordSearchInput');
        const suggestionsBox = document.getElementById('searchSuggestions');
        let focusedIdx = -1;

        if (searchInput && suggestionsBox) {
            function showSuggestions(results, query) {
                suggestionsBox.innerHTML = '';
                if (!query) { suggestionsBox.classList.remove('visible'); return; }

                if (results.length === 0) {
                    suggestionsBox.innerHTML = `<div class="search-not-found">검색 결과 없음 — 예: Am, G7, Dmaj7, Dsus4, E5</div>`;
                } else {
                    results.forEach((key, i) => {
                        const item = document.createElement('div');
                        item.className = 'suggestion-item';
                        item.dataset.chord = key;
                        const notes = chords[key].notes || '';
                        const tag = chordMeta[key] || '';
                        item.innerHTML = `
                            <span class="suggestion-name">${key}</span>
                            <span class="suggestion-desc">${notes}</span>
                            ${tag ? `<span class="suggestion-tag">${tag}</span>` : ''}
                        `;
                        item.addEventListener('mousedown', (e) => {
                            e.preventDefault();
                            selectChord(key);
                        });
                        suggestionsBox.appendChild(item);
                    });
                }
                suggestionsBox.classList.add('visible');
                focusedIdx = -1;
            }

            function selectChord(chordName) {
                searchInput.value = chordName;
                suggestionsBox.classList.remove('visible');
                renderFretboard(chordName);
                // 해당 버튼도 활성화 표시
                document.querySelectorAll('.chord-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.chord === chordName);
                });
                // 코드 디스플레이 쪽으로 부드럽게 스크롤
                const display = document.querySelector('.chord-display');
                if (display) display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            searchInput.addEventListener('input', () => {
                const q = searchInput.value.trim();
                showSuggestions(searchChords(q), q);
            });

            searchInput.addEventListener('keydown', (e) => {
                const items = suggestionsBox.querySelectorAll('.suggestion-item');
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    focusedIdx = Math.min(focusedIdx + 1, items.length - 1);
                    items.forEach((el, i) => el.classList.toggle('focused', i === focusedIdx));
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    focusedIdx = Math.max(focusedIdx - 1, 0);
                    items.forEach((el, i) => el.classList.toggle('focused', i === focusedIdx));
                } else if (e.key === 'Enter') {
                    if (focusedIdx >= 0 && items[focusedIdx]) {
                        selectChord(items[focusedIdx].dataset.chord);
                    } else {
                        const results = searchChords(searchInput.value);
                        if (results.length > 0) selectChord(results[0]);
                    }
                } else if (e.key === 'Escape') {
                    suggestionsBox.classList.remove('visible');
                }
            });

            searchInput.addEventListener('blur', () => {
                setTimeout(() => suggestionsBox.classList.remove('visible'), 150);
            });
        }

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if ('CDEFGAB'.includes(key)) {
                let chord = key;
                if (e.shiftKey) chord += 'm';
                else if (e.ctrlKey) chord += '7';
                if (chords[chord]) renderFretboard(chord);
            }
        });
