/** @format */
const link: string = 'http://localhost:3000/tasks';
import { getData } from '../js/components/api.js';

const inputTask: HTMLInputElement = document.querySelector('.input-task');
const btn: HTMLButtonElement = document.querySelector('.btn');
const tasksBox: HTMLUListElement = document.querySelector('.tasks-box');

const tasks: any = await getData(link);

const render = (dataTasks: any[]) => {
	dataTasks.map(task => {
		bodyTask(task.taskText);
	});
};

const bodyTask = (task: any) => {
	const id: number = new Date().getTime();

	const li: HTMLLIElement = document.createElement('li');
	li.classList.add('task');

	const taskText: HTMLParagraphElement = document.createElement('p');
	taskText.innerText = task;

	const confirmBox: HTMLDivElement = document.createElement('div');
	confirmBox.classList.add('confirm-box');

	const inputCheckBox: HTMLInputElement = document.createElement('input');
	inputCheckBox.id = 'input-checkbox';
	inputCheckBox.type = 'checkbox';
	inputCheckBox.checked = false;

	const inputLabel: HTMLLabelElement = document.createElement('label');
	inputLabel.htmlFor = 'input-checkbox';
	inputLabel.innerText = 'Zrobiony';

	const delBtn: HTMLButtonElement = document.createElement('button')
	delBtn.classList.add("del-btn");
	delBtn.innerText = 'Usuń'

	confirmBox.append(inputCheckBox, inputLabel, delBtn);

	li.append(taskText, confirmBox);
	tasksBox.appendChild(li);
};

const addTask = (e: Event) => {
	e.preventDefault();
	const id = new Date().getTime();
	const taskText: string = inputTask.value;
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
