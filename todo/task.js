const form = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

function saveTasks() {
    // хранилище задач
    const tasks = [];
    document.querySelectorAll('.task__title').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText) {
    const newTaskElement = document.createElement('div');
    newTaskElement.className = 'task';

    const newTaskTitle = document.createElement('div');
    newTaskTitle.className = 'task__title';
    newTaskTitle.textContent = taskText;

    const newTaskLink = document.createElement('a');
    // newTaskLink.outerHTML = '<a href="#" class="task__remove">&times;</a>';
    newTaskLink.className = 'task__remove';
    newTaskLink.innerHTML = '&times;';

    newTaskLink.addEventListener('click', function (e) {
        e.preventDefault();
        tasksList.removeChild(newTaskElement);
        saveTasks();    // обновляем хранилище задач после удаления task
    });

    // компановка HTML элемента задачи
    newTaskElement.appendChild(newTaskTitle);
    newTaskElement.appendChild(newTaskLink);
    tasksList.appendChild(newTaskElement);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
        addTask(newTask);
        saveTasks(); // обновляем хранилище задач после добавления task
        taskInput.value = '';
    }
});

window.addEventListener('load', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task);
        });
    }

});
