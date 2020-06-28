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

// show popup
const showPopup = () => {
    if (createTaskWrapper.classList.contains('d-none')) {
        createTaskWrapper.classList.remove('d-none');
    }
};

// close popup
const closePopup = () => createTaskWrapper.classList.add('d-none');

// showing the popup for new task
fab.addEventListener('click', (e) => {
    showPopup();
});

// close the popup
closeIcon.addEventListener('click', () => {
    closePopup();
    taskForm.reset();
});

// save to local storage
const saveToStorage = (taskName, lockTaskBool, importantTaskBool, taskID) => {
    let tasks;
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }
    tasks.push({
        taskID,
        taskName,
        lockTaskBool,
        importantTaskBool,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const deleteFromStorage = (id) => {
    if (localStorage.getItem('tasks') !== null) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let item = tasks.find((item) => item.taskID === Number(id));
        let itemIndex = tasks.indexOf(item);
        tasks.splice(itemIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        console.warn('No item found on storage');
    }
};

// delete task
taskLists.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('deletable')) {
        let targetTaskID = e.target.parentElement.parentElement.dataset.taskid;
        deleteFromStorage(targetTaskID);
        e.target.parentElement.parentElement.remove();
    }
});

// add task to list
const addTask = (taskName, lockTaskBool, importantTaskBool, taskID) => {
    let taskTemplate = `
    <div class="list" data-taskID="${taskID}">
    ${importantTaskBool ? '<div class="list__activeMarker"></div>' : ''}
    <div class="list__title">${taskName}</div>
        <div class="list__icon ${lockTaskBool ? 'locked' : 'deletable'}"
        title="${lockTaskBool ? 'Locked' : 'Delete'} task">
            <img src="./img/${lockTaskBool ? 'locked' : 'delete'}.svg"
            title="${lockTaskBool ? 'Locked' : 'Delete'} task" alt="">
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
        let taskID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
        addTask(taskName, lockTaskBool, importantTaskBool, taskID);
        saveToStorage(taskName, lockTaskBool, importantTaskBool, taskID);
        closePopup();
        taskForm.reset();
    } else {
        taskForm.taskName.value = '';
    }
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

// initializer
(function () {
    let tasks;
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((item) => {
            addTask(item.taskName, item.lockTaskBool, item.importantTaskBool, item.taskID);
        });
    }
})();
