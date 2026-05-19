const difficultyContainer = document.getElementById('difficulty-container');
const difficultyBox = document.getElementById('difficulty-box');
const mode = document.getElementById('mode');
const modeBox = document.getElementById('mode-box');
const challenge = document.getElementById('challenge');
const challengePage = document.getElementById('challenge-page');
const intro = document.getElementById('intro');
const challengeInput = document.getElementById('challenge-input');
const selectDifficulty = document.querySelectorAll('.difficulty');
const selectMode = document.querySelectorAll('input[name="mode"]');
const time = document.getElementById('time');
const level = document.getElementById('level');
const wpm = document.getElementById('wpm');
const accuracy = document.getElementById('accuracy');
const highscore = document.getElementById('high-score');
const start = document.getElementById('start');
const timeType = document.getElementById('time-type');
const restart = document.getElementById('restart')
const wpmResult = document.getElementById('wpm-result')
const accuracyResult = document.getElementById('accuracy-result');
const characterComparison = document.getElementById('character-comparison');
const retry = document.getElementById('retry-btn');
const test = document.querySelectorAll('.test');
const result = document.getElementById('result');
const highscoreResult = document.getElementById('highscore-result');
const highscoreWpmResult = document.getElementById('highscore-wpm-result');
const highscoreAccuracyResult = document.getElementById('highscore-accuracy-result');
const highscoreCorrect = document.getElementById('highscore-correct');
const highscoreWrong = document.getElementById('highscore-wrong');
const highscoreRetry = document.getElementById('highscore-retry-btn');
const correct = document.getElementById('correct');
const wrong = document.getElementById('wrong')
let timed = 60;
let passageSec = 0;
let passageMin = 0;
let timerId;
let difficultyState = false;
let modeState = false;
let challengeText = '';
let previousInput = '';
let isNewHighscore = false;
let testFinished = false;

if (window.innerWidth >= 1024) {
    difficultyBox.id = "";
    retry.textContent = "Beat this score"
    highscoreRetry.textContent = "Beat this score"
}

function toggleDropdown(box, isOpen) {
    box.classList.toggle('opacity-0', !isOpen);
    box.classList.toggle('-translate-y-2', !isOpen);
    box.classList.toggle('scale-95', !isOpen);
    box.classList.toggle('pointer-events-none', !isOpen);
    box.classList.toggle('opacity-100', isOpen);
    box.classList.toggle('translate-y-0', isOpen);
    box.classList.toggle('scale-100', isOpen);
};

difficultyContainer.addEventListener('click', () => {
    difficultyState = !difficultyState;
    toggleDropdown(difficultyBox, difficultyState);
});

mode.addEventListener('click', () => {
    modeState = !modeState;
    toggleDropdown(modeBox, modeState);
});

async function getchallenge() {
    const RawData = await fetch('data.json');
    const data = await RawData.json();
    const selectedChallenge = document.querySelector('input[name="difficulty"]:checked').value;
    level.textContent = selectedChallenge.charAt(0).toUpperCase() + selectedChallenge.slice(1);
    const challenges = data[selectedChallenge];
    const randomChallenge = Math.floor(Math.random() * challenges.length);
    const selected = challenges[randomChallenge];
    challengeText = selected.text;
    challenge.textContent = '';
    challengeText.split('').forEach(char => {
        let span = document.createElement('span');
        span.textContent = char;
        challenge.appendChild(span);
    });

    difficultyState = false;
    toggleDropdown(difficultyBox, difficultyState);
};

getchallenge();

challenge.addEventListener('click', started)

start.addEventListener('click', started)

document.addEventListener('keydown', e => {
    if (e.key === "Enter" && !timerId) {
        started();
    }
});

function moveCaretToEnd() {
    const end = challengeInput.value.length;
    challengeInput.setSelectionRange(end, end);
}

function started() {
    test[1].classList.add("border-b", "border-neutral-400");
    test[2].style.display = "flex";
    testFinished = false;
    isNewHighscore = false;
    challengeInput.focus();
    moveCaretToEnd();
    if (timerId) {
        challengeInput.focus();
        moveCaretToEnd();
        return;
    }
    challengePage.classList.remove("blur-xs");
    intro.style.display = "none";
    let selectedMode = document.querySelector('input[name="mode"]:checked').value;
    if (selectedMode === "Timed") {
        timerId = setInterval(() => {
            timed--;
            time.value = `0:${String(timed).padStart(2, "0")}`;
            time.style.color = "hsl(49, 85%, 70%)";
            if (timed <= 0) {
                clearInterval(timerId);
                timerId = null;
                challengeInput.readOnly = true;
                finishTest();
            };
            if (challengeInput.value.length >= challengeText.length) {
                clearInterval(timerId);
                timerId = null;
                challengeInput.readOnly = true;
                finishTest();
            }
        }, 1000)
    } else if (selectedMode === "passage") {
        timerId = setInterval(() => {
            passageSec++;
            time.value = `${passageMin}:${String(passageSec).padStart(2, "0")}`
            time.style.color = "hsl(49, 85%, 70%)";
            if (passageSec >= 60) {
                passageSec = 0;
                passageMin++;
                time.value = `${passageMin}:${String(passageSec).padStart(2, "0")}`
            }
            if (challengeInput.value.length >= challengeText.length) {
                clearInterval(timerId);
                timerId = null;
                challengeInput.readOnly = true;
                finishTest();
            }
        }, 1000)
    }
};

challengeInput.addEventListener('input', Checking)

function Checking() {
    moveCaretToEnd();
    if (challengeInput.value.length < previousInput.length) {
        challengeInput.value = previousInput;
        moveCaretToEnd();
        return;
    }
    previousInput = challengeInput.value;
    let correctLetters = 0;
    let totalLetters = 0;
    const letters = challenge.querySelectorAll('span');
    for (let i = 0; i < letters.length; i++) {
        if (!challengeInput.value[i]) {
            letters[i].style.color = "";
        } else if (challengeInput.value[i] === challengeText[i]) {
            correctLetters++;
            totalLetters++;
            letters[i].style.color = "hsl(140, 63%, 57%)"
        } else {
            totalLetters++
            letters[i].style.color = "hsl(354, 63%, 57%)";
            letters[i].style.textDecoration = "underline";
            letters[i].style.textDecorationColor = "hsl(354, 63%, 57%)";
        }
        let words = correctLetters / 5;
        correct.textContent = correctLetters;
        wrong.textContent = totalLetters - correctLetters;
        highscoreCorrect.textContent = correctLetters;
        highscoreWrong.textContent = totalLetters - correctLetters;
        if (totalLetters !== 0) {
            accuracy.value = Math.floor((correctLetters / totalLetters) * 100) + "%";
            accuracyResult.value = Math.floor((correctLetters / totalLetters) * 100) + "%";
            highscoreAccuracyResult.value = Math.floor((correctLetters / totalLetters) * 100) + "%";
        }
        accuracy.style.color = "hsl(0, 100%, 65%)";
        let selectedMode = document.querySelector('input[name="mode"]:checked').value;
        if (selectedMode === "Timed" && (timed !== 0 && timed !== 60)) {
            let TimedTime = (60 - timed) / 60;
            wpm.value = Math.floor(words / TimedTime)
            wpmResult.value = Math.floor(words / TimedTime)
            highscoreWpmResult.value = Math.floor(words / TimedTime)
        } else if (selectedMode === "passage" && passageSec !== 0) {
            let TimedTime = passageMin + (passageSec / 60)
            wpm.value = Math.floor(words / TimedTime)
            wpmResult.value = Math.floor(words / TimedTime)
            highscoreWpmResult.value = Math.floor(words / TimedTime)
        }
    }
}

selectDifficulty.forEach(radio => {
    radio.addEventListener('change', getchallenge);
});

selectMode.forEach(radio => {
    radio.addEventListener('change', () => {
        timeType.textContent = radio.parentElement.textContent.trim();
        modeState = false;
        toggleDropdown(modeBox, modeState);
    });
});

highscore.textContent = localStorage.getItem("bestWpm") || "0"

restart.addEventListener('click', clear)

function finishTest() {
    if (testFinished) return;
    testFinished = true;
    test.forEach(section => {
        section.style.display = "none";
    });
    if (Number(localStorage.getItem('bestWpm')) < Number(wpm.value)) {
        localStorage.setItem('bestWpm', wpm.value);
        highscore.textContent = wpm.value;
        isNewHighscore = true;
    }
    if (isNewHighscore) {
        result.style.display = "none";
        highscoreResult.style.display = "flex";
    } else {
        highscoreResult.style.display = "none";
        result.style.display = "flex";
    }
}

function clear() {
    clearInterval(timerId);
    timerId = null;
    wpm.value = "0";
    accuracy.value = "100%"
    accuracy.style.color = "white"
    time.value = "0:60"
    time.style.color = "white"
    previousInput = "";
    isNewHighscore = false;
    testFinished = false;
    getchallenge();
    timed = 60;
    passageMin = 0;
    passageSec = 0;
    challengeInput.value = "";
    challengeInput.readOnly = false;
    challengePage.classList.add("blur-xs");
    intro.style.display = "";
}

retry.addEventListener('click', () => {
    clear();
    test.forEach(section => {
        section.style.display = "";
    });
    result.style.display = "none";
    test[2].style.display = "none";
    test[1].classList.remove("border-b", "border-neutral-400");
})

highscoreRetry.addEventListener('click', () => {
    clear();
    test.forEach(section => {
        section.style.display = "";
    });
    test[2].style.display = "none";
    highscoreResult.style.display = "none";
    test[1].classList.remove("border-b", "border-neutral-400");
})
