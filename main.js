const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function formatTime(date){
	const hours12 = date.getHours() % 12 || 12;
	const minutes = date.getMinutes();
	const isAm = date.getHours() < 12;

	return `${hours12.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)} ${isAm ? "AM" : "PM"}`;
}

function formatDate(date){
	const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobor", "November", "December"];

	return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
	const now = new Date();

	timeElement.textContent = formatTime(now);
	dateElement.textContent = formatDate(now);
}, 200);
