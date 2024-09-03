const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const weatherNow = document.getElementById("weatherNow");
const forecast = document.getElementById("forecast");
const url = "https://api.open-meteo.com/v1/forecast?latitude=39.3183&longitude=-76.4641&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York&forecast_days=3"

function formatTime(date){
	const hours12 = date.getHours() % 12 || 12;
	const minutes = date.getMinutes();
	const isAm = date.getHours() < 12;

	return `${hours12.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)} ${isAm ? "AM" : "PM"}`;
}

function formatDate(date){
	const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobor", "November", "December"];

	return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status})`);
    }

	  const MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const d = new Date();
  
    const json = await response.json();

    function month() {
      return (MONTHS[d.getMonth()]);
    }
    
    function currentTemp() {
      return (Math.round(json.current.temperature_2m))
    }

    function day(i) {
      return (d.getDate() + i);
    }

    function tempMax(i) {
      return (Math.round(json.daily.temperature_2m_max[i]));
    }

    function tempMin(i) {
      return (Math.round(json.daily.temperature_2m_min[i]));
    }

    weatherNow.innerHTML = `
      <label class="weatherTitle">Now</label>
      <label class="currentTemp">${currentTemp()}&deg;F</label>
    `
    forecast.innerHTML = `
      <label class="weatherTitle">Forecast</label><br>
      <label class="forecastText">Today, <sup>${tempMax(0)}</sup>/<sub>${tempMin(0)}</sub>&deg;F</label>
      <label class="forecastText">${month()} ${day(1)}, <sup>${tempMax(1)}</sup>/<sub>${tempMin(1)}</sub>&deg;F</label>
      <label class="forecastText">${month()} ${day(2)}, <sup>${tempMax(2)}</sup>/<sub>${tempMin(2)}</sub>&deg;F</label>
    `

  } catch {
    console.error(error.message);
  }
  
}

getWeather();

setInterval(() => {
	const now = new Date();

	timeElement.textContent = formatTime(now);
	dateElement.textContent = formatDate(now);
}, 200);
