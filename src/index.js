// timestamp is number of miliseconds that has happen since 1970 - that's how JS works.
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
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

  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="images/cloudy.png" width="36" />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max"> 23</span>
              <span class="weather-forecast-temperature-min"> 12</span>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  // this variable was created outside function- GLOBAL VARIABLE - is going to keep track of celsius whenever search/reponse from API
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// display by default a city , on load!
function search(city) {
  let units = "metric";
  let apiKey = "5a12dd671f298e4a72d4ec34c2cdc4ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//make an API call
function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", handleSubmit);

// units
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  // whenever click on C - remove active class from fahrenheit link - and add active link on C
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  // whenever click on F - remove active class from celsius link - and add active link on F
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

// create variable with null - on load!
let celsiusTemperature = null;

//city on load
search("lisbon");
displayForecast();
// current location button - with geolocation API - copy different APIurl from openweather

//3
function showLocation(position) {
  let units = "metric";
  let apiKey = "5a12dd671f298e4a72d4ec34c2cdc4ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//2 we could copy this from web - "js current location"
function currentWeatherLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
//1
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentWeatherLocation);
