import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

function getDate() {
  const now = new Date().getTime();
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0].getTime();
  
  if (selectedDate < now) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
  }
  
  return selectedDate - now;
}

function updateTimer(days, hours, minutes, seconds) {
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}


let countdownIntervalId = null;

function startCountdown(timeToCount) {
  countdownIntervalId = setInterval(() => {
    timeToCount -= 1000;
    const { days, hours, minutes, seconds } = convertMs(timeToCount);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

const startBtn = document.querySelector('[data-start]');

startBtn.addEventListener('click', () => {
  const timeToCount = getDate();

  if (timeToCount) {
    startCountdown(timeToCount);
  }
});
function addLeadingZero(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = Math.floor(ms / day);
  
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}




