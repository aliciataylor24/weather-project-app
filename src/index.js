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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="row-info">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18º |</span>
                <span class="weather-forecast-temperature-min">12º</span>
              </div>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showLocation(coordinates) {
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
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
  showLocation(response.data.coord);
}

function searchCity(city) {
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
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

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentcoordinates(showLocation);
}

let currentLocationButton = document.querySelector("#current-id");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("New York");
