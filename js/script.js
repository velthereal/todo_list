function pageLoaded() {
	let tipsButton = document.getElementById('tips');
	let modalWindow = document.querySelector('.modalWindow');
	let ul = document.querySelector('ul');
	let closeButton = document.querySelector('.modalWindow .close');
	let pencil = document.querySelector('.pencil');
	let inputText = document.getElementById('inputText');


	inputText.addEventListener('keypress', function(key){
		if(key.which !== 13){
			return;
		}
		if(!/\w/.test(this.value)){
			return;
		}

		let li = document.createElement('li');
		li.setAttribute('class', 'listItem');
		let span = document.createElement('span');
		let span2 = document.createElement('span');
		let span3 = document.createElement('span');
		span3.setAttribute('class', 'important');
		let impIcon = document.createElement('i');
		impIcon.setAttribute('class', 'fa-solid fa-exclamation');
		span.setAttribute('class', 'delete');
		span2.textContent = this.value;
		span2.setAttribute('class', 'text')
		let icon = document.createElement('i');
		icon.setAttribute('class', 'fa-solid fa-trash-can');
		span.addEventListener('click', () => {
			span.parentElement.parentElement.remove();
		})
		span3.addEventListener('click', () => {
			li.style.color = 'tomato';
		})
		span.insertAdjacentElement('beforeend', icon);
		span3.insertAdjacentElement('beforeend', impIcon);
		li.insertAdjacentElement('beforeend', span);
		li.insertAdjacentElement('beforeend', span2);
		li.insertAdjacentElement('beforeend', span3);
		ul.insertAdjacentElement('beforeend', li);
		this.value = '';
		save();
	});

	pencil.addEventListener('click', () => {
		inputText.classList.toggle('none');
	});
	tipsButton.addEventListener('click', () => {
		modalWindow.classList.add('showModalWindow');
	});
	closeButton.addEventListener('click', () => {
		modalWindow.classList.remove('showModalWindow');
	});
	function save(){
		localStorage.setItem('todos', ul.innerHTML);
	}
}

// for(let i = 0; i < listItem.length; i++){
// 	listItem[i].addEventListener('click', () => {
// 		listItem[i].classList.toggle('no-decoration');
// 	})
// }

window.addEventListener('DOMContentLoaded', pageLoaded);