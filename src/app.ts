/** @format */

const link: string = 'http://localhost:3000/tasks';
import { getData } from '../js/components/api.js';

const inputTask: HTMLInputElement = document.querySelector('.input-task');
const btn: HTMLButtonElement = document.querySelector('.btn');
const tasksBox: HTMLUListElement = document.querySelector('.tasks-box');
const inputCategory = [...document.querySelectorAll('[name=category]')] as HTMLInputElement[];

let tasks: any[] = [];

const fetchTasks = async () => {
	tasks = await getData(link);
	render(tasks);
};

const render = (dataTasks: any[]) => {
	tasksBox.innerHTML = '';
	dataTasks.map(task => {
		bodyTask(task);
	});
};

const bodyTask = (task: any) => {
	const { id, taskText, done, category } = task;

	const CATEGORY_NAME_MAPPING = {
		gym: 'Siłownia',
		work: 'Praca',
		social: 'Rodzina',
	};

	const currentCategory = CATEGORY_NAME_MAPPING[category];

	const li: HTMLLIElement = document.createElement('li');
	li.classList.add('task');

	const taskTextElement: HTMLParagraphElement = document.createElement('p');
	taskTextElement.innerText = taskText;
	if (done) {
		taskTextElement.classList.add('confirm');
	}

	const inputCheckBox: HTMLInputElement = document.createElement('input');
	inputCheckBox.type = 'checkbox';
	inputCheckBox.checked = done;

	const inputLabel: HTMLLabelElement = document.createElement('label');
	inputLabel.innerText = 'Zrobiony';

	const categoryLabel: HTMLLabelElement = document.createElement('label');
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
		} else {
			taskTextElement.classList.remove('confirm');
		}
	});

	const delBtn: HTMLButtonElement = document.createElement('button');
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

const addTask = (e: Event) => {
	e.preventDefault();

	const taskText: string = inputTask.value.trim();
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
