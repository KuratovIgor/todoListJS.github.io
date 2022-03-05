document.addEventListener("DOMContentLoaded", () => {
	const btnSave = document.getElementById('savebtn');
	const inputNewTask = document.querySelector('input');
	const task = document.querySelector('ul');
	const filter = document.querySelector('.todo__filter');

	const doneTasks = document.getElementsByClassName('_done');
	const notDoneTasks = document.getElementsByClassName('_notDone');
	const allTasks = document.getElementsByClassName('taskEl');

    //localStorage.clear();
	loadFromLocalStorage();

	btnSave.addEventListener('click', () => {
	if (inputNewTask.value !== ""){	
		addNewTask();
	}
	});

	inputNewTask.addEventListener('keyup', event => {
		if (event.code === 'Enter' && inputNewTask.value !== ""){
			addNewTask();
		}
	});

	task.addEventListener('click', event => {
		const element = event.target.closest('li');

		if (event.target.closest('#deleting')) {
			event.target.parentElement.remove();
		}

		if (element) {
			element.classList.toggle('_done');
			element.classList.toggle('_notDone');
		}

		update();

		saveToLocalStorage();
	});

	filter.addEventListener('click', event => {
		event.preventDefault();

		let currentFilter = event.target.closest('a');

		if (currentFilter){
			if (currentFilter.getAttribute('id') === 'done')
				display(doneTasks, notDoneTasks);

			if (currentFilter.getAttribute('id') === 'notDone')
				display(notDoneTasks, doneTasks);

			if (currentFilter.getAttribute('id') === 'all'){
				display(doneTasks, notDoneTasks, true);
			}
		}
	});

	function addNewTask(){
		const newRecord = document.createElement('li');

		newRecord.innerHTML = `${inputNewTask.value} <img id="deleting" src="img/del.png" alt="">`;
		newRecord.className = 'taskEl _notDone';
		task.append(newRecord);

		inputNewTask.value = "";

		update();

		saveToLocalStorage();
	}

	function update(){
		document.querySelector('#done').firstElementChild.innerText = doneTasks.length;
		document.querySelector('#notDone').firstElementChild.innerText = notDoneTasks.length;
		document.querySelector('#all').firstElementChild.innerText = allTasks.length;
	}

	function display(show, hide, isDisplayAll = false){
		if (!isDisplayAll){
			for(item of show){
				item.style.visibility = 'visible';
				item.style.position = 'relative';
			}
			for(item of hide){
				item.style.visibility = 'hidden';
				item.style.position = 'absolute';
			}
		}
		else{
			for(item of show){
				item.style.visibility = 'visible';
				item.style.position = 'relative';
			}
			for(item of hide){
				item.style.visibility = 'visible';
				item.style.position = 'relative';
			}
		}
	}

	function saveToLocalStorage(){
		localStorage.setItem('task', task.innerHTML);
	}

	function loadFromLocalStorage(){
		task.innerHTML = localStorage.getItem('task');
		update();
	}
});




