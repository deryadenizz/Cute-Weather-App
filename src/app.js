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

/* let celsiusValue = response.data.main.temp;
function Fahrenheit(event) {
  event.preventDefault();
  let tempC = document.querySelector(".temperature");
  let tempFValue = Math.round((celsiusValue * 9) / 5 + 32);
  tempC.innerHTML = `${tempFValue}°`;
}

function Celcius(event) {
  event.preventDefault();
  let tempF = document.querySelector(".temperature");
  tempF.innerHTML = `${celsiusValue}°`;
}

let changeF = document.querySelector("#fahrenheit-link");
changeF.addEventListener("click", Fahrenheit);
let changeC = document.querySelector("#celsius-link");
changeC.addEventListener("click", Celcius);
 */
let apiKey = "c9e178d3343o502b6177fca9t3bf1da8";
let apiUrl = "";
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

  https: axios.get(apiUrl).then(showCurrentWeather);
}

let showLocation = document.querySelector("#selectCity");
showLocation.addEventListener("submit", showCity);

function showCurrentWeather(response) {
  let weatherHeader = document.querySelector("h2");
  let temp = Math.round(response.data.temperature.current);
  weatherHeader.innerHTML = `${temp}°`;

  let iconElement = document.querySelector("#todayicon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  let todayWeatherMax = document.querySelector(".today.max");
  let todayTempMax = Math.round(response.data.main.temp_max);
  todayWeatherMax.innerHTML = `${todayTempMax}°C`;
  let todayWeatherMin = document.querySelector(".today.min");
  let todayTempMin = Math.round(response.data.main.temp_min);
  todayWeatherMin.innerHTML = `${todayTempMin}°C`;

  /*   let tomWeather = document.querySelector(".tom.max");
  let tomTempMax = Math.round(response.data.main.temp_max);
  tomWeather.innerHTML = `${tomTempMax}°C`;
  
  let otherWeather = document.querySelector(".other.max");
  let otherTempMax = Math.round(response.data.main.temp_max);
  otherWeather.innerHTML = `${otherTempMax}°C`; */
}

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  let h2 = document.querySelector("h2");
  let temp = Math.round(response.data.temperature.current);
  h2.innerHTML = `${temp}°`;
  let h1 = document.querySelector("h1");
  let city = response.data.city;
  h1.innerHTML = `${city}`;
  let iconElement = document.querySelector("#todayicon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let todayWeatherMax = document.querySelector(".today.max");
  let todayTempMax = Math.round(response.data.main.temp_max);
  todayWeatherMax.innerHTML = `${todayTempMax}°C`;
  let todayWeatherMin = document.querySelector(".today.min");
  let todayTempMin = Math.round(response.data.main.temp_min);
  todayWeatherMin.innerHTML = `${todayTempMin}°C`;
}

let locateBtn = document.querySelector(".locate");
locateBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});
