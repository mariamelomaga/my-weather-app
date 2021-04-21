let date = new Date();
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
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hours};`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}; `;
}

let h2 = document.querySelector("#date");
h2.innerHTML = `${day} ${hour} : ${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", search);

function fahrenheit(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#temperature");
  degreesElement.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#temperature");
  degreesElement.innerHTML = 22;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "5a12dd671f298e4a72d4ec34c2cdc4ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {}
