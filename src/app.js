let time = new Date().getHours();
if (time >= 6 && time < 18) {
  document.querySelector(".container").classList.add("day");
} else {
  document.querySelector(".container").classList.add("night");
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

function formatDate() {
  let dayNumber = days[now.getDay()];
  let monthNumber = months[now.getMonth()];
  return `${dayNumber}, ${monthNumber} ${now.getDate()}`;
}
document.querySelector(".date-time").innerHTML = formatDate();

function formatForecastDay(timestamp, index) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (index === 0) {
    return "Today";
  }
  if (index === 1) {
    return "Tomorrow";
  }
  return days[day];
}

let apiKey = "c9e178d3343o502b6177fca9t3bf1da8";
let cityName = "İstanbul";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCurrentWeather);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 3) {
      forecastHTML =
        forecastHTML +
        `
             <div class="col-sm-4 today">
               <div class="today emoji">
                 <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                   forecastday.condition.icon
                 }.png" alt="" id="todayicon" />
               </div>
               <div class="today todaydesc">Cloudy</div>
               <div class="today max" id="forecasttemp-max-${index}">${Math.round(
          forecastday.temperature.maximum
        )}°C</div>
               <div class="today min" id="forecasttemp-min-${index}">${Math.round(
          forecastday.temperature.minimum
        )}°</div>
               <br />
               <div class="time-day">${formatForecastDay(
                 forecastday.time,
                 index
               )}</div>
             </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(cityName) {
  let apiKey = "c9e178d3343o502b6177fca9t3bf1da8";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function showCity(event) {
  event.preventDefault();
  let show = document.querySelector("#validationServer03");
  let cityName = show.value.trim();
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  let heading = document.querySelector("h1");
  heading.textContent = cityName;

  let input = document.querySelector("#validationServer03");
  input.value = "";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
  getForecast(cityName);
  showCelsiusTemp(event);
}

let showLocation = document.querySelector("#selectCity");
showLocation.addEventListener("submit", showCity);

function showCurrentWeather(response) {
  let weatherHeader = document.querySelector("h2");
  let temp = Math.round(response.data.temperature.current);
  weatherHeader.innerHTML = `${temp}°`;
  celsiusTemp = Math.round(response.data.temperature.current);
  getForecast(response.data.city);
}

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  getForecast(cityName);
}
function displayWeather(response) {
  let h2 = document.querySelector("h2");
  let temp = Math.round(response.data.temperature.current);
  h2.innerHTML = `${temp}°`;
  let h1 = document.querySelector("h1");
  let city = response.data.city;
  h1.innerHTML = `${city}`;
  getForecast(response.data.city);

  celsiusTemp = Math.round(response.data.temperature.current);
}

let locateBtn = document.querySelector(".locate");
locateBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemp = parseFloat(temperatureElement.innerHTML);
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemp}°`;

  let forecastTempMaxElements = document.querySelectorAll(
    "[id^='forecasttemp-max-']"
  );
  forecastTempMaxElements.forEach(function (forecastTempElement) {
    celsiusTemp = parseFloat(forecastTempElement.innerHTML);
    fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    forecastTempElement.innerHTML = `${fahrenheitTemp}°`;
  });
  let forecastTempMinElements = document.querySelectorAll(
    "[id^='forecasttemp-min-']"
  );
  forecastTempMinElements.forEach(function (forecastTempElement) {
    celsiusTemp = parseFloat(forecastTempElement.innerHTML);
    fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    forecastTempElement.innerHTML = `${fahrenheitTemp}°`;
  });

  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = parseFloat(temperatureElement.innerHTML);
  temperatureElement.innerHTML = `${celsiusTemp}°`;

  let forecastTempMaxElements = document.querySelectorAll(
    "[id^='forecasttemp-max-']"
  );
  forecastTempMaxElements.forEach(function (forecastTempElement, index) {
    let fahrenheitTempMax = parseFloat(forecastTempElement.innerHTML);
    let celsiusTempMax = Math.round(((fahrenheitTempMax - 32) * 5) / 9);
    forecastTempElement.innerHTML = `${celsiusTempMax}°`;
  });

  let forecastTempMinElements = document.querySelectorAll(
    "[id^='forecasttemp-min-']"
  );
  forecastTempMinElements.forEach(function (forecastTempElement, index) {
    let fahrenheitTempMin = parseFloat(forecastTempElement.innerHTML);
    let celsiusTempMin = Math.round(((fahrenheitTempMin - 32) * 5) / 9);
    forecastTempElement.innerHTML = `${celsiusTempMin}°`;
  });

  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemp);
