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
}

function search(event) {
  event.preventDefault();
  let apiKey = "2e4de2b11b8a6f23faaa2d921b3e9a8f";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

document.querySelector("form").addEventListener("submit", search);
