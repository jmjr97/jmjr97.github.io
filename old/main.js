const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

const apiKey = "35e8a70434bdb13f0fd3547c8a3073b0"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=39.308282&lon=-76.449802&units=imperial&appid="

// weather functions
async function checkWeather() {
	const response = await fetch(apiUrl + `${apiKey}`)
	var data = await response.json();
	console.log(data);

	icon = getWeatherIcon(data.weather[0].main);


	document.getElementById('w-icon').src = icon;
	document.getElementById('w-info').innerHTML = Math.round(data.main.temp) + "°F" + " | " + data.weather[0].main;
 
}

function getWeatherIcon(icon) {
	switch (icon) {
		case 'Clear':
			return 'img/weather/clear.png';
		case 'Clouds':
			return 'img/weather/clouds.png';
		case 'Drizzle':
			return 'img/weather/drizzle.png';
		case 'Mist':
			return 'img/weather/mist.png';
		case 'Rain':
			return 'img/weather/rain.png';
		case 'Snow':
			return 'img/weather/snow.png';
		default:
			return 'img/weather/snow.png';
	}
}

// time functions
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

checkWeather();
