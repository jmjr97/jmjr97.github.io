const leftNoteBox = document.getElementById('n_left_note_box');
const rightNoteBox = document.getElementById('n_right_note_box');

leftNoteBox.addEventListener('keyup', saveLeft);
rightNoteBox.addEventListener('keyup', saveRight);

function saveLeft() {
	localStorage.setItem('leftNote', leftNoteBox.value)
}

function saveRight() {
	localStorage.setItem('rightNote', rightNoteBox.value)
}

document.addEventListener('DOMContentLoaded', function() {
	leftNoteBox.value = localStorage.getItem('leftNote')
	rightNoteBox.value = localStorage.getItem('rightNote')
});
