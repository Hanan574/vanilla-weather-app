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
let hour = now.getHours();
let minute = now.getMinutes();

let p = document.querySelector("h4");
p.innerHTML = `${day},  ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  //let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          
          <div class="icon">
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"/>
          </div>
          <div class="forecast-temperature">${Math.round(
            forecastDay.temp.max
          )}</div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weather(response) {
  console.log(response);

  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector(
    ".skyType"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    ".precipitation"
  ).innerHTML = `Pressure : ${response.data.main.pressure}`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity : ${response.data.main.humidity}`;
  document.querySelector(
    ".wind"
  ).innerHTML = `Wind : ${response.data.wind.speed} km/hr`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}
//displayForecast();
function search(event) {
  event.preventDefault();
  let apiKey = "2e4de2b11b8a6f23faaa2d921b3e9a8f";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

document.querySelector("form").addEventListener("submit", search);
