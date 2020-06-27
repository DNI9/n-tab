// https://developer.chrome.com/extensions/getstarted
//
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const taskLists = document.querySelector('.taskLists');
const fab = document.querySelector('.FAB');
const createTaskWrapper = document.querySelector('.createTask_wrapper');
const submitBtn = document.querySelector('.newTask__submit');
const taskForm = document.querySelector('.newTask__form');
const closeIcon = document.querySelector('.closeIcon');

// for the time
setInterval(() => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    if (minute < 10) minute = '0' + minute;
    hours.textContent = hour;
    minutes.textContent = minute;
}, 500);

// edit task
taskLists.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('list__icon')) {
        console.log('button clicked');
    }
});

// showing the popup for new task
fab.addEventListener('click', (e) => {
    if (createTaskWrapper.classList.contains('d-none')) {
        createTaskWrapper.classList.remove('d-none');
    }
});

// close the popup
closeIcon.addEventListener('click', () => {
    createTaskWrapper.classList.add('d-none');
    taskForm.reset();
});

// Handling submit event
submitBtn.addEventListener('click', (e) => {
    console.log(taskForm.taskName.value);
});
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(taskForm.taskName.value);
});
