/** @format */
const link = 'http://localhost:3000/tasks';
import { getData } from '../js/components/api.js';
const inputTask = document.querySelector('.input-task');
const btn = document.querySelector('.btn');
const tasksBox = document.querySelector('.tasks-box');
const tasks = await getData(link);
const render = (dataTasks) => {
    dataTasks.map(task => {
        bodyTask(task.taskText);
    });
};
const bodyTask = (task) => {
    const id = new Date().getTime();
    const li = document.createElement('li');
    li.classList.add('task');
    const taskText = document.createElement('p');
    taskText.innerText = task;
    const confirmBox = document.createElement('div');
    confirmBox.classList.add('confirm-box');
    const inputCheckBox = document.createElement('input');
    inputCheckBox.id = 'input-checkbox';
    inputCheckBox.type = 'checkbox';
    inputCheckBox.checked = false;
    const inputLabel = document.createElement('label');
    inputLabel.htmlFor = 'input-checkbox';
    inputLabel.innerText = 'Zrobiony';
    confirmBox.append(inputCheckBox, inputLabel);
    li.append(taskText, confirmBox);
    tasksBox.appendChild(li);
};
const addTask = (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    const taskText = inputTask.value;
    taskText.length > 3 ? console.log(taskText) : alert('Wpisz treść zadania');
    if (taskText.length > 40) {
        alert('Treść zadania nie może przekraczać 40 znaków!');
    }
    const task = {
        id,
        taskText,
    };
    fetch(link, {
        method: 'post',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    inputTask.value = '';
};
btn.addEventListener('click', addTask);
render(tasks);
