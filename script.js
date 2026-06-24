// --- VARIABLES ---
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isWorkMode = true;

// --- HTML ELEMENTS ---
const display = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');
const gif = document.getElementById('timer-gif');
const statusText = document.querySelector('.status-text');

function setGifSource(src) {
    if (gif) {
        gif.src = src;
    }
}

function animateGifGrow() {
    if (!gif) return;
    gif.classList.add('gif-grow');
    setTimeout(() => gif.classList.remove('gif-grow'), 250);
}

// --- LOADING SCREEN LOGIC ---
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    // Wait for 1.5 seconds, then fade out and hide the loading screen
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    }, 1500);
});

// --- TIMER LOGIC ---
function updateDisplay() {
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = m + ':' + s;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        // Swap to the work or break GIF when started
        setGifSource(isWorkMode ? 'work.gif' : 'break.gif');
        
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    setGifSource('idle.gif');
                    alert(isWorkMode ? 'Work session complete! Take a break.' : 'Break over! Back to work.');
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    setGifSource('idle.gif'); // Go back to idle when paused
}

function resetTimer(resetGif = true) {
    clearInterval(timer);
    isRunning = false;
    minutes = isWorkMode ? 25 : 5;
    seconds = 0;
    updateDisplay();
    if (resetGif) {
        setGifSource('idle.gif'); // Go back to idle when reset
    }
}

// --- BUTTON CLICKS ---
startBtn.addEventListener('click', () => {
    animateGifGrow();
    startTimer();
});
pauseBtn.addEventListener('click', () => {
    animateGifGrow();
    pauseTimer();
});
resetBtn.addEventListener('click', () => {
    animateGifGrow();
    resetTimer();
});

workBtn.addEventListener('click', () => {
    animateGifGrow();
    isWorkMode = true;
    workBtn.classList.add('active');
    breakBtn.classList.remove('active');
    statusText.textContent = 'Focus Session';
    resetTimer(false);
    setGifSource('work.gif');
});

breakBtn.addEventListener('click', () => {
    animateGifGrow();
    isWorkMode = false;
    breakBtn.classList.add('active');
    workBtn.classList.remove('active');
    statusText.textContent = 'Break Time';
    minutes = 5;
    resetTimer(false);
    setGifSource('break.gif');
});

// Initialize the timer display when the page loads
updateDisplay();