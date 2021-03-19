// https://developer.chrome.com/extensions/getstarted

// Alias
const $ = document.querySelector.bind(document);

const hours = $('.hours');
const minutes = $('.minutes');
const taskLists = $('.taskLists');
const fab = $('.FAB');
const createTaskWrapper = $('.createTask_wrapper');
const submitBtn = $('.newTask__submit');
const taskForm = $('.newTask__form');
const closeIcon = $('.closeIcon');
const greetingName = $('.greeting__name');

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

const editTask = (id) => {
    try {
        const tasks = JSON.parse(localStorage?.tasks);
        const task = tasks.find((task) => task.taskID == id);
        task.lockTaskBool = false;
        localStorage.tasks = JSON.stringify(tasks);
    } catch (err) {
        console.error(err);
    }
};

// delete/edit task
taskLists.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('deletable')) {
        let targetTaskID = e.target.parentElement.parentElement.dataset.taskid;
        deleteFromStorage(targetTaskID);
        e.target.parentElement.parentElement.remove();
    }

    // Unlock tasks
    if (e.target.parentElement.classList.contains('locked')) {
        let targetTaskID = e.target.parentElement.parentElement.dataset.taskid;
        e.target.parentElement.classList.replace('locked', 'deletable');
        e.target.parentElement.innerHTML = `<img src="./img/delete.svg" title="Delete task" alt="">`;
        editTask(targetTaskID);
    }
});

// add task to list
const addTask = (taskName, lockTaskBool, importantTaskBool, taskID) => {
    let taskTemplate = `
    <div class="list" data-taskID="${taskID}">
    ${importantTaskBool ? '<div class="list__activeMarker"></div>' : ''}
    <div class="list__title">${taskName}</div>
        <div class="list__icon ${lockTaskBool ? 'locked' : 'deletable'}"
        title="${lockTaskBool ? 'Locked' : 'Delete'} task, click to unlock">
            <img src="./img/${lockTaskBool ? 'locked' : 'delete'}.svg"
            title="${
                lockTaskBool ? 'Locked' : 'Delete'
            } task, click to unlock" alt="">
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
            addTask(
                item.taskName,
                item.lockTaskBool,
                item.importantTaskBool,
                item.taskID
            );
        });
    }
})();
