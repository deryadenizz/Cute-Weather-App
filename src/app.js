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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["tue", "wed", "thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
             <div class="col-sm-4 today">
               <div class="today emoji">
                 <img src=".." alt="" id="todayicon" />
               </div>
               <div class="today todaydesc">Cloudy</div>
               <div class="today max">15°C</div>
               <div class="today min">min 8°</div>
               <br />
               <div class="time-day">${day}</div>
             </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  console.log(apiURL);
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
}

let showLocation = document.querySelector("#selectCity");
showLocation.addEventListener("submit", showCity);

function showCurrentWeather(response) {
  let weatherHeader = document.querySelector("h2");
  let temp = Math.round(response.data.temperature.current);
  weatherHeader.innerHTML = `${temp}°`;
  let description = document.querySelector(".todaydesc");
  description.innerHTML = `${response.data.condition.description}`;
  let iconElement = document.querySelector("#todayicon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemp = Math.round(response.data.temperature.current);

  getForecast(response.data.city);
}

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
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
  let description = document.querySelector(".todaydesc");
  description.innerHTML = `${response.data.condition.description}`;
  celsiusTemp = Math.round(response.data.temperature.current);
}

let locateBtn = document.querySelector(".locate");
locateBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});
let apiKey = "c9e178d3343o502b6177fca9t3bf1da8";
let cityName = "İstanbul";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCurrentWeather);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${fahrenheitTemp}°`;
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celsiusTemp}°`;
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}

let celsiusTemp = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemp);
