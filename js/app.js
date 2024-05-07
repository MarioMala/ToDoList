/** @format */
const link = 'http://localhost:3000/tasks';
import { getData } from '../js/components/api.js';
const inputTask = document.querySelector('.input-task');
const btn = document.querySelector('.btn');
const tasksBox = document.querySelector('.tasks-box');
const inputCategory = [...document.querySelectorAll('[name=category]')];
let tasks = [];
const fetchTasks = async () => {
    tasks = await getData(link);
    render(tasks);
};
const render = (dataTasks) => {
    tasksBox.innerHTML = '';
    dataTasks.map(task => {
        bodyTask(task);
    });
};
const bodyTask = (task) => {
    const { id, taskText, done, category } = task;
    const CATEGORY_NAME_MAPPING = {
        gym: 'Siłownia',
        work: 'Praca',
        social: 'Rodzina',
    };
    const currentCategory = CATEGORY_NAME_MAPPING[category];
    const li = document.createElement('li');
    li.classList.add('task');
    const taskTextElement = document.createElement('p');
    taskTextElement.innerText = taskText;
    if (done) {
        taskTextElement.classList.add('confirm');
    }
    const inputCheckBox = document.createElement('input');
    inputCheckBox.type = 'checkbox';
    inputCheckBox.checked = done;
    const inputLabel = document.createElement('label');
    inputLabel.innerText = 'Zrobiony';
    const categoryLabel = document.createElement('label');
    categoryLabel.innerText = `Kategoria: ${currentCategory}`;
    categoryLabel.classList.add('category');
    inputCheckBox.addEventListener('change', () => {
        const newDoneStatus = inputCheckBox.checked;
        fetch(`${link}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ done: newDoneStatus }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (newDoneStatus) {
            taskTextElement.classList.add('confirm');
        }
        else {
            taskTextElement.classList.remove('confirm');
        }
    });
    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn');
    delBtn.innerText = 'Usuń';
    delBtn.addEventListener('click', () => {
        fetch(`${link}/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchTasks();
        });
    });
    li.append(taskTextElement, categoryLabel, inputCheckBox, inputLabel, delBtn);
    tasksBox.appendChild(li);
};
const addTask = (e) => {
    e.preventDefault();
    const taskText = inputTask.value.trim();
    if (!taskText) {
        alert('Wpisz treść zadania');
        return;
    }
    if (taskText.length > 40) {
        alert('Treść zadania nie może przekraczać 40 znaków!');
        return;
    }
    const selectedCategory = inputCategory.find(category => category.checked).id;
    const task = {
        taskText,
        done: false,
        category: selectedCategory,
    };
    fetch(link, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => {
        fetchTasks();
    });
    inputTask.value = '';
};
btn.addEventListener('click', addTask);
fetchTasks();
