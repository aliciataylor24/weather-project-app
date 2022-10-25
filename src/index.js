let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

let spanDate = document.querySelector("#new-time");
spanDate.innerHTML = `Last updated ${day} ${hours}:${minutes}`;

function currentTime(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let timeInput = document.querySelector("#search-text-input");
  cityInput.innerHTML = timeInput.value;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", currentTime);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showTemperature(response) {
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid-desc").innerHTML =
    `Humidity: ${response.data.main.humidity}` + "%";
  document.querySelector("#wind-desc").innerHTML =
    `Wind Speed: ${Math.round(response.data.wind.speed)}` + "km/h";
  document.querySelector(
    "#temp-desc"
  ).innerHTML = `Currently: ${response.data.weather[0].main}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "668a1c8b3b012a1326e44a41f8a72185";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let getFahrenheit = document.querySelector("#fahrenheit");
getFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let getCelsius = document.querySelector("#celsius");
getCelsius.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

function showLocation(position) {
  let apiKey = "668a1c8b3b012a1326e44a41f8a72185";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#current-id");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("New York");
