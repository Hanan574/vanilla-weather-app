function weather(response) {
  console.log(response);
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector(
    ".skyType"
  ).innerHTML = `${response.data.weather[0].description}`;
}

let apiKey = "2e4de2b11b8a6f23faaa2d921b3e9a8f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(weather);
