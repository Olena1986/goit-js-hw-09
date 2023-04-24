const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId;

function startBackgroundChange() {
  startBtn.disabled = true; 
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor(); 
  }, 1000);
}

function stopBackgroundChange() {
  startBtn.disabled = false; 
  clearInterval(intervalId); 
}

startBtn.addEventListener('click', startBackgroundChange);
stopBtn.addEventListener('click', stopBackgroundChange);

