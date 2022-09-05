const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItemsE1 = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryE1 = document.getElementById("country");
const weatherForcastE1 = document.getElementById("weatherforcast");
const currentTempE1 = document.getElementById("current-temp");
const hourlydata=document.getElementById("hourlydata")
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeE1.innerHTML =
    (hourIn12HrFormat < 10 ? "0" + hourIn12HrFormat : hourIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateE1.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

const API_KEY = "7178494917c72a9c633a3463d023d6fd";
const Api_Key = "N47BZV43MSYCZF44N2UWYD7A2";
getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${Api_Key}
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?iconSet=icons1&unitGroup=metric&key=${Api_Key}
      `
    )
      .then((res) => res.json())
      .then((data) => {
        showWeatherData2(data);
      });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        showWeatherData(data);
      });  
  });
}
function showWeatherData(data) {
  let { humidity, pressure } = data.main;
  let { sunrise, sunset } = data.sys;
  let { speed } = data.wind;

  timezone.innerHTML = data.name;
  countryE1.innerHTML = data.coord.lat + "N  " + data.coord.lon + "E";

  currentWeatherItemsE1.innerHTML = ` <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}</div>
  </div>
  <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
  </div>
  <div class="weather-item">
    <div>Wind Speed</div>
    <div>${speed}</div>
  </div>
  <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
  </div>
  <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
  </div>`;
}

function showWeatherData2(data) {
  console.log(data)
  let otherDayForcast = "";
  data.days.forEach((day, idx) => {
    if (idx == 0) {
      currentTempE1.innerHTML = ` <img
    src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png"
    width="100px"
    alt="weather icon"
    class="w-icon"
  />

  <div class="other">
    <div class="day">${window
      .moment(day.datetimeEpoch * 1000)
      .format("dddd")}</div>
    <div class="temp">Night - ${day.feelslikemin}&#176; C</div>
    <div class="temp">Day - ${day.feelslikemax}&#176; C</div>
  </div>`;
    } else if (idx <= 6 && idx >= 1) {
      otherDayForcast += `<div class="weather-forcast-item">
    <div class="day">${window
      .moment(day.datetimeEpoch * 1000)
      .format("ddd")}</div>
    <img
      src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${
        day.icon
      }.png"
      alt="weather icon"
      class="w-icon"
    />
    <div class="temp">Night - ${day.feelslikemin}&#176; C</div>
    <div class="temp">Day - ${day.feelslikemax}&#176; C</div>
  </div>`;
    }
  });

  weatherForcastE1.innerHTML = otherDayForcast;

  const time = new Date()
  let hourlyforcast=""
  console.log(data.days[time.getDate()].hours)
  data.days[time.getDate()].hours.forEach((day,idx)=>{
    hourlyforcast+=`<div class="hourdata"><div class="hour">${day.datetime}</div>
    <img
      src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${
        day.icon
      }.png"
      alt="weather icon"
      class="w-icon"
    />
    <div class="hourlytemp">${day.temp}&#176; C</div>
    </div>`
  })
hourlydata.innerHTML=hourlyforcast;
}
