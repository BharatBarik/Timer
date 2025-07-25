document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const progressBar = document.getElementById('progressBar');
    const bellStatus = document.getElementById('bellStatus');
    const warningBell = document.getElementById('warningBell');
    const finalBell = document.getElementById('finalBell');

    let timeLeft = 180; // 3 minutes in seconds
    let timerInterval;
    let isRunning = false;
    const totalTime = 180;
    let warningPlayed = false;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progressPercentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Change progress bar color and play warning when 1 minute left
        if (timeLeft <= 60 && !warningPlayed) {
            progressBar.style.background = 'linear-gradient(90deg, #FFC107, #FF9800)';
            bellStatus.textContent = 'Warning! 1 minute left';
            bellStatus.className = 'bell-status warning';
            warningBell.play();
            warningPlayed = true;
        }
    }

    function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        warningPlayed = false;
        startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        startBtn.classList.remove('start-btn');
        startBtn.classList.add('pause-btn');
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finalBell.play();
                bellStatus.textContent = 'Time is up!';
                bellStatus.className = 'bell-status alert';
                
                // Automatically reset after 3 seconds
                setTimeout(resetTimer(), 3000);
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        startBtn.classList.remove('pause-btn');
        startBtn.classList.add('start-btn');
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 180;
        isRunning = false;
        warningPlayed = false;
        updateDisplay();
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        startBtn.classList.remove('pause-btn');
        startBtn.classList.add('start-btn');
        bellStatus.textContent = 'Timer ready';
        bellStatus.className = 'bell-status';
        progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    }

    startBtn.addEventListener('click', function() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);

    // Initialize display
    updateDisplay();
});
