var timer = null;

function showCurrentTime() {
  var currentTime = new Date();
  document.getElementById(
    "currentTime"
  ).textContent = currentTime.toLocaleTimeString();
}

function zeroPadding(num) {
  return ("0" + num).slice(-2);
}

// 01:23:45 -> 1*3600 + 23*60 + 45 = 5025
function HMStoSec(hms) {
  var [h, m, s] = hms.split(":");
  s = typeof s === "undefined" ? 0 : s;
  var sec = Number(h) * 3600 + Number(m) * 60 + Number(s);
  return sec;
}

// 5025/3600
function SectoHMS(sec) {
  sec = Number(sec);
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec - h * 3600) / 60);
  var s = sec - h * 3600 - m * 60;
  return zeroPadding(h) + ":" + zeroPadding(m) + ":" + zeroPadding(s);
}

function showCountDownTime(endSec) {
  var startTime = document.getElementById("currentTime").textContent;
  var startSec = HMStoSec(startTime);
  var timerSec = endSec - startSec;
  timerSec = timerSec < 0 ? 60 * 60 * 24 + timerSec : timerSec;
  document.getElementById("countDownTime").textContent = SectoHMS(timerSec);
}

function startTimer() {
  if(timer !== null){
    clearInterval(timer);
  }
  var endTime = document.getElementById("endTime").value;
  var endSec = HMStoSec(endTime);
  timer = setInterval(function() {
    showCountDownTime(endSec);
  }, 100);
}

window.onload = function() {
  var button = document.getElementById("timerStart");
  button.addEventListener("click", startTimer, false);
  setInterval("showCurrentTime()", 100);
};
