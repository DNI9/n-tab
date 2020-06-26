// https://developer.chrome.com/extensions/getstarted
//
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');

const setTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour > 12) hour -= 12;
    if (minute < 10) minute = '0' + minute;
    hours.textContent = hour;
    minutes.textContent = minute;
};

setInterval(setTime, 500);
