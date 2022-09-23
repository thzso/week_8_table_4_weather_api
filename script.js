document.getElementById("root").innerHTML = `
<h1>Weather for adventurers</h1>

    <p id="date"></p>

    <input id="city" list="cities" type="input" placeholder="Choose a city!" />

    <datalist id="cities">
    </datalist>

    <div id="city-weather-info">
      <div id="city-pic">
        <img src="" id="currentCity" alt="" />
      </div>
      <div id="weather-info">
        <p id="temperature"></p>
        <p id="sky-condition"></p>
        <p id="humidity"></p>
      </div>
    </div>

    <div id="gif-container"></div>
`;

let n = new Date();
n = n.toDateString();

document.getElementById("date").innerHTML = "" + n;

let cities = [
  "Agra",
  "Moscow",
  "Budapest",
  "London",
  "Paris",
  "Pisa",
  "Rio De Janeiro",
  "Barcelona",
  "Berlin",
  "Dubai",
  "Washington",
  "Rome",
  "Tokyo",
  "Cairo",
  "Mexico City",
  "Sydney",
  "New York",
];

cities = cities.sort();
let newStr = "";
for (let town of cities) {
  newStr += `<option value="${town}"></option>`;
}
document.getElementById("cities").innerHTML = newStr;

async function loadData(event) {
  console.log(event.target.value);
  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=e5a002f2945b4d998fe172153221909&q=${event.target.value}&aqi=no`
  );
  let data = await response.json();
  console.log(data);
  var content = `<p> <img id="" src="${data.current.condition.icon}"> </p>
    <p id="temperature">${data.current.temp_c} °C</p>
    <p id="humidity"> <span class="material-symbols-outlined">
    humidity_mid
    </span> ${data.current.humidity}%</p>`;
  document.getElementById("weather-info").innerHTML = content;

  if (cities.includes(event.target.value)) {
    document.getElementById("city-pic").innerHTML = `
        <img src="images/${event.target.value.replaceAll(
          " ",
          "_"
        )}.svg" id="currentCity" alt="" />
        `;
    document.body.style.backgroundImage = `url(background/${event.target.value.replaceAll(
      " ",
      "_"
    )}.jpg)`;

    document.getElementById(
      "date"
    ).innerHTML = `${data.current.last_updated} <img id='forecast' src='images/right-arrow-black-triangle.png'>`;

    var skyText = data.current.condition.text;
    skyText = skyText.toLowerCase();

    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/default.gif')";

    if (skyText.includes("sun")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/sunny.gif')";
    }
    if (skyText.includes("clear")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/night.gif')";
    }
    if (skyText.includes("cloud") || skyText.includes("overcast")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/cloudy.gif')";
    }
    if (skyText.includes("wind")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/windy.gif')";
    }
    if (skyText.includes("rain")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/rainy.gif')";
    }
    if (skyText.includes("snow")) {
      document.getElementById("gif-container").style.backgroundImage =
        "url('gif/snowy.gif')";
    }
  }

  document.getElementById("forecast").addEventListener("click", loadForecast);
}

async function loadForecast() {
  let tomorrow = new Date(n);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toDateString();
  document.getElementById("date").innerHTML = tomorrow;

  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=e5a002f2945b4d998fe172153221909&q=${
      document.getElementById("city").value
    }&days=2&aqi=no&alerts=no`
  );
  let data = await response.json();
  console.log(data);
  let content = `<p> <img id="" src="${data.forecast.forecastday[1].day.condition.icon}"> </p>
        <p id="temperature">${data.forecast.forecastday[1].day.avgtemp_c} °C</p>
        <p id="humidity"> <span class="material-symbols-outlined">
        humidity_mid
        </span> ${data.forecast.forecastday[1].day.avghumidity}%</p>`;
  document.getElementById("weather-info").innerHTML = content;

  let skyText = data.forecast.forecastday[1].day.condition.text;
  skyText = skyText.toLowerCase();

  document.getElementById("gif-container").style.backgroundImage =
    "url('gif/default.gif')";

  if (skyText.includes("sun")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/sunny.gif')";
  }
  if (skyText.includes("clear")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/night.gif')";
  }
  if (skyText.includes("cloud") || skyText.includes("overcast")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/cloudy.gif')";
  }
  if (skyText.includes("wind")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/windy.gif')";
  }
  if (skyText.includes("rain")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/rainy.gif')";
  }
  if (skyText.includes("snow")) {
    document.getElementById("gif-container").style.backgroundImage =
      "url('gif/snowy.gif')";
  }
}

document.getElementById("city").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    return loadData(event);
  }
});
