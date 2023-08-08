function pageLoaded() {
	let inputText = document.getElementById('inputText');
	let ul = document.querySelector('ul');
	// let listItem = document.querySelectorAll('.listItem');
	// let $delete = document.querySelectorAll('.delete');
	// let $text = document.querySelectorAll('.text');
	// let $important = document.querySelectorAll('.important');
	let $save = document.getElementById('save');
	let $clear = document.getElementById('clear');
	let tipsButton = document.getElementById('tips');
	let pencil = document.querySelector('.pencil');
	let modalWindow = document.querySelector('.modalWindow');
	let closeButton = document.querySelector('.modalWindow .close');

	inputText.addEventListener('keypress', function(key){
		if(key.which !== 13){
			return;
		}
		if(!/\w/.test(this.value)){
			return;
		}

		let li = document.createElement('li');
		let deleteI = document.createElement('i');
		let text = document.createElement('span');
		let importantI = document.createElement('i');

		li.classList.add('listItem');
		deleteI.classList.add('delete', 'fa-solid', 'fa-trash-can');
		text.classList.add('text');
		importantI.classList.add('important', 'fa-solid', 'fa-exclamation');
		li.insertAdjacentElement('beforeend', deleteI);
		text.textContent = this.value;
		li.insertAdjacentElement('beforeend', text);
		li.insertAdjacentElement('beforeend', importantI);
		ul.insertAdjacentElement('beforeend', li);
		this.value = '';
		save();
	});
	loadTodos();
	deleteTodo();
	importantTodo();

	ul.addEventListener('click', function(event){
		if(event.target.tagName == 'LI'){
			event.target.classList.toggle('listItemClick');
			save();
		}
	});

	function deleteTodo(){
		let listItem = document.querySelectorAll('.listItem');
		let $delete = document.querySelectorAll('.delete');
		for(let i = 0; i < $delete.length; i++){
			$delete[i].addEventListener('click', function(){
				listItem[i].remove();
				save();
			});
		}
	}
	function importantTodo(){
		let listItem = document.querySelectorAll('.listItem');
		let $important = document.querySelectorAll('.important');
		for(let i = 0; i < $important.length; i++){
			$important[i].addEventListener('click', function(){
				listItem[i].classList.toggle('important-bg');
			});
			save();
		}
	}

	pencil.addEventListener('click', () => {
		inputText.classList.toggle('none');
	});
	tipsButton.addEventListener('click', () => {
		modalWindow.classList.add('showModalWindow');
	});
	closeButton.addEventListener('click', () => {
		modalWindow.classList.remove('showModalWindow');
	});
	$clear.addEventListener('click',function(){
		ul.innerHTML = '';
		localStorage.removeItem('todos', ul.innerHTML)
	});
	function loadTodos(){
		if(localStorage.getItem('todos')){
			ul.innerHTML = localStorage.getItem('todos');
		}
	}
	function save(){
		localStorage.setItem('todos', ul.innerHTML);
	}

	function getList(){
		let list = localStorage.getItem('todos').split('</li>');
		list = list.map((item)=> item + '</li>');
		if(list[list.length-1].indexOf('<li') == -1){
			list.pop();
		}
		return list;
	}
	$save.addEventListener('click', function() {
		let nameBtn = ['Done', 'Active', 'Important', 'All'];
		let index = nameBtn.indexOf(this.textContent);
		index++;
		if(index == nameBtn.length) index = 0;
		this.textContent = nameBtn[index];
		filterlist();
	})
	function filterlist(){
		switch($save.textContent){
			case 'Done':
				ul.innerHTML = getList().filter((item)=> item.indexOf('listItemClick') !== -1).join('');
				break;
			case 'Active':
				ul.innerHTML = getList().filter((item)=> item.indexOf('listItemClick') === -1).join('');
				break;
			case 'All':
				ul.innerHTML = localStorage.getItem('todos');
				break;
			case 'Important':
				ul.innerHTML = getList().filter((item)=> item.indexOf('important-bg') !== -1).join('');
		}
	}
}

window.addEventListener('DOMContentLoaded', pageLoaded);