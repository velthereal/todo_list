let tipsButton = document.getElementById('tips');
let modalWindow = document.querySelector('.modalWindow');
let closeButton = document.querySelector('.modalWindow .close');
let pencil = document.querySelector('.pencil');
let inputText = document.getElementById('inputText');
let listItem = document.querySelectorAll('.listItem');

tipsButton.addEventListener('click', () => {
	modalWindow.classList.add('showModalWindow');
});
closeButton.addEventListener('click', () => {
	modalWindow.classList.remove('showModalWindow');
});
pencil.addEventListener('click', () => {
	inputText.classList.toggle('none');
});

for(let i = 0; i < listItem.length; i++){
	listItem[i].addEventListener('click', () => {
		listItem[i].classList.toggle('no-decoration');
	})
}