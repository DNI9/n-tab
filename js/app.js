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

        // TODO
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

// add task to list
const addTask = (taskName, lockTaskBool, importantTaskBool) => {
    let taskTemplate = `
    <div class="list">
    ${importantTaskBool ? '<div class="list__activeMarker"></div>' : ''}
    <div class="list__title">${taskName}</div>
        <div class="list__icon ${lockTaskBool ? 'locked' : 'editable'}"
        title="${lockTaskBool ? 'Locked' : 'Edit'} task">
            <img src="./img/${lockTaskBool ? 'locked' : 'editable'}.svg"
            title="${lockTaskBool ? 'Locked' : 'Edit'} task" alt="">
        </div>
    </div>`;
    taskLists.innerHTML += taskTemplate;
};

// Handling submit event
submitBtn.addEventListener('click', (e) => {
    let taskName = taskForm.taskName.value.trim();
    let lockTaskBool = taskForm.lockTask.checked;
    let importantTaskBool = taskForm.importantTask.checked;
    if (taskName !== '') {
        addTask(taskName, lockTaskBool, importantTaskBool);
        createTaskWrapper.classList.add('d-none');
        taskForm.reset();
    } else {
        taskForm.taskName.value = '';
    }
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
