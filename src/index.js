let now = new Date();
let spanDate = document.querySelector("#new-time");

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
let hours = now.getHours();
let minutes = now.getMinutes();

spanDate.innerHTML = `Last updated ${day} ${hours}:${minutes}`;

function currentTime(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let timeInput = document.querySelector("#search-text-input");
  cityInput.innerHTML = timeInput.value;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let showTempF = document.querySelector("#temperature");
  showTempF.innerHTML = 19;
}
let showCelsius = document.querySelector("#celsius");
showCelsius.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let showTempC = document.querySelector("#temperature");
  showTempC.innerHTML = 66;
}
let getFahrenheit = document.querySelector("#fahrenheit");
getFahrenheit.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humid-desc"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector("#wind-desc").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#temp-desc").innerHTML =
    response.data.weather[0].main;
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
