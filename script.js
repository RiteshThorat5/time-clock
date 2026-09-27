// ========================================
// TIME DASHBOARD
// ========================================


// ========================================
// LIVE CLOCK
// ========================================

let is24Hour = false;

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    let ampm = "";

    if (!is24Hour) {

        ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }

    }

    hours = String(hours).padStart(2, "0");

    document.getElementById("time").textContent =
        `${hours}:${minutes}:${seconds}`;

    document.getElementById("ampm").textContent =
        is24Hour ? "24 HOUR FORMAT" : ampm;

    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    document.getElementById("date").textContent = date;
}

updateClock();

setInterval(updateClock, 1000);


// ========================================
// 12H / 24H FORMAT
// ========================================

document.getElementById("formatBtn").addEventListener("click", function () {

    is24Hour = !is24Hour;

    updateClock();

    this.textContent = is24Hour
        ? "Switch to 12H"
        : "Switch to 24H";
});


// ========================================
// STOPWATCH
// ========================================

let stopwatchInterval = null;

let stopwatchSeconds = 0;

function updateStopwatchDisplay() {

    const hours = Math.floor(stopwatchSeconds / 3600);

    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);

    const seconds = stopwatchSeconds % 60;

    document.getElementById("stopwatchDisplay").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


// Start Stopwatch

document.getElementById("startStopwatch").addEventListener("click", function () {

    if (stopwatchInterval !== null) {
        return;
    }

    stopwatchInterval = setInterval(function () {

        stopwatchSeconds++;

        updateStopwatchDisplay();

    }, 1000);
});


// Pause Stopwatch

document.getElementById("pauseStopwatch").addEventListener("click", function () {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;
});


// Reset Stopwatch

document.getElementById("resetStopwatch").addEventListener("click", function () {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    stopwatchSeconds = 0;

    updateStopwatchDisplay();
});


// ========================================
// COUNTDOWN TIMER
// ========================================

let timerInterval = null;

let timerSeconds = 0;

function updateTimerDisplay() {

    const hours = Math.floor(timerSeconds / 3600);

    const minutes = Math.floor((timerSeconds % 3600) / 60);

    const seconds = timerSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


// Start Timer

document.getElementById("startTimer").addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    const hours =
        parseInt(document.getElementById("timerHours").value) || 0;

    const minutes =
        parseInt(document.getElementById("timerMinutes").value) || 0;

    const seconds =
        parseInt(document.getElementById("timerSeconds").value) || 0;


    // If timer is already paused,
    // continue from current time

    if (timerSeconds === 0) {

        timerSeconds =
            (hours * 3600) +
            (minutes * 60) +
            seconds;

    }


    if (timerSeconds <= 0) {

        alert("Please enter a valid timer.");

        return;
    }


    updateTimerDisplay();


    timerInterval = setInterval(function () {

        timerSeconds--;

        updateTimerDisplay();


        if (timerSeconds <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            timerSeconds = 0;

            updateTimerDisplay();

            alert("Timer finished!");

        }

    }, 1000);

});


// Pause Timer

document.getElementById("pauseTimer").addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;
});


// Reset Timer

document.getElementById("resetTimer").addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 0;

    document.getElementById("timerHours").value = "";

    document.getElementById("timerMinutes").value = "";

    document.getElementById("timerSeconds").value = "";

    updateTimerDisplay();
});


// ========================================
// ALARM
// ========================================

let alarmTimeValue = null;

let alarmTriggered = false;


// Set Alarm

document.getElementById("setAlarm").addEventListener("click", function () {

    const selectedTime =
        document.getElementById("alarmTime").value;


    if (!selectedTime) {

        alert("Please select an alarm time.");

        return;
    }


    alarmTimeValue = selectedTime;

    alarmTriggered = false;


    document.getElementById("alarmStatus").textContent =
        `Alarm set for ${selectedTime}`;

});


// Clear Alarm

document.getElementById("clearAlarm").addEventListener("click", function () {

    alarmTimeValue = null;

    alarmTriggered = false;

    document.getElementById("alarmTime").value = "";

    document.getElementById("alarmStatus").textContent =
        "No alarm set";

});


// Check Alarm Every Second

setInterval(function () {

    if (!alarmTimeValue || alarmTriggered) {
        return;
    }


    const now = new Date();

    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");


    if (currentTime === alarmTimeValue) {

        alarmTriggered = true;

        document.getElementById("alarmStatus").textContent =
            "Alarm ringing!";


        alert("Alarm!");

    }

}, 1000);


// ========================================
// WORLD CLOCK
// ========================================

function updateWorldClock() {

    const now = new Date();


    const london = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });


    const newYork = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });


    const tokyo = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });


    document.getElementById("londonTime").textContent =
        london;


    document.getElementById("newYorkTime").textContent =
        newYork;


    document.getElementById("tokyoTime").textContent =
        tokyo;
}





// ========================================
// FULLSCREEN
// ========================================

document.getElementById("fullscreenBtn").addEventListener("click", function () {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

        this.textContent = "Exit Fullscreen";

    } else {

        document.exitFullscreen();

        this.textContent = "Fullscreen";
    }

});


// ========================================
// THEME
// ========================================

let lightMode = false;

document.getElementById("themeBtn").addEventListener("click", function () {

    lightMode = !lightMode;

    document.body.classList.toggle("light-mode");

    this.textContent =
        lightMode ? "Dark Theme" : "Light Theme";

});