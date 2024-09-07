const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecast");
const url = 'https://api.open-meteo.com/v1/forecast?latitude=39.3183&longitude=76.4641&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York';

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

	  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const d = new Date();
  
    const json = await response.json();

    function weatherCode(wc) {
      switch (true) {
        case (wc === 0):
          return 'sunny';

        case (wc === 1 || wc === 2):
          return 'cloudy';

        case (wc === 3):
          return 'overcast';

        case (wc === 45 || wc === 48):
          return 'fog';

        case (wc >= 51 && wc <= 55):
          return 'drizzle';

        case (wc === 56 || wc === 57 || wc === 66 || wc === 67):
          return 'freezing-rain';

        case ((wc >= 61 && wc <= 65) || (wc >= 80 && wc <= 82)):
          return 'rain';

        case ((wc >= 71 && wc <= 77) || (wc === 85 || wc === 86)):
          return 'snow';

        case (wc === 95):
          return 'thunderstorm';

        default:
      }
    }
    
    const nowWC = json.current.weather_code;

    function getWC(i) {
      return (json.daily.weather_code[i]);
    }

    function dayOfWeek(i) {
      if ((d.getDay() + i) > 6) {
        return DAYS[d.getDay() + (i - 7)];
      } else {
        return DAYS[d.getDay() + i];
      }
    }
    
    function currentTemp() {
      return (Math.round(json.current.temperature_2m))
    }

    function tempMax(i) {
      return (Math.round(json.daily.temperature_2m_max[i]));
    }

    function tempMin(i) {
      return (Math.round(json.daily.temperature_2m_min[i]));
    }

    currentWeather.innerHTML = `
      <div class='weatherDay'>
        <label class="weatherText">Now: ${currentTemp()}&deg;F</label>
        <img class='weatherIcon' src='img/weather/${weatherCode(nowWC)}.png'>
      </div>
`

    forecast.innerHTML = `
      <div class='weatherDay'>
        <label class="weatherText">Today: ${tempMax(0)}&deg; ${tempMin(0)}&deg;</label>
        <img class='weatherIcon' src='img/weather/${weatherCode(getWC(0))}.png'>
      </div>
      <div class='weatherDay'>
        <label class="weatherText">${dayOfWeek(1)}: ${tempMax(1)}&deg; ${tempMin(1)}&deg;</label>
        <img class='weatherIcon' src='img/weather/${weatherCode(getWC(1))}.png'>
      </div>
      <div class='weatherDay'>
        <label class="weatherText">${dayOfWeek(2)}: ${tempMax(2)}&deg; ${tempMin(2)}&deg;</label>
        <img class='weatherIcon' src='img/weather/${weatherCode(2)}.png'>
      </div>
      <div class='weatherDay'>
        <label class="weatherText">${dayOfWeek(3)}: ${tempMax(3)}&deg; ${tempMin(3)}&deg;</label>
        <img class='weatherIcon' src='img/weather/${weatherCode(3)}.png'>
      </div>
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
