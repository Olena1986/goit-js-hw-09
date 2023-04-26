import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.warning("Please choose a date in the future");
   startBtn.setAttribute('disabled', 'disabled'); 
    } else {
      startBtn.removeAttribute('disabled'); 
    }
    
  },
};

const flatpickrEl = flatpickr("#datetime-picker", options);

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const startBtn = document.querySelector('[data-start]');
let timerActive = false;

startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  const timeToCount = flatpickrEl.selectedDates[0] - Date.now();
  let timeLeft = timeToCount;
  const countdown = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(flatpickrEl.selectedDates[0] - Date.now());
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    timeLeft -= 1000;
    
    if (timeLeft < 0) {
      
      clearInterval(countdown);
    }
  }, 1000);

  setTimeout(() => { clearInterval(countdown) }, timeToCount)
}

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







