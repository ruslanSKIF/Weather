"use strict"

const weatherBlock = document.querySelector('#weather');

async function loadWeather (e) {
  
  weatherBlock.innerHTML = `
  <div class="weather__loading">
    <img src="./img/loading.gif" alt="loading">
  </div>`

  
  const currentWeatherServer = 'https://api.openweathermap.org/data/2.5/weather?q=Kryvyi+Rih&units=metric&lang=uk&appid=1'
  const currentResponse = await fetch(currentWeatherServer, {
    method: 'GET',
  });
  const currentWeatherResponse = await currentResponse.json();

  const forecastWeatherServer = 'https://api.openweathermap.org/data/2.5/forecast?q=Kryvyi+Rih&units=metric&lang=uk&appid=1';
  const forecastResponse = await fetch(forecastWeatherServer, {
    method: 'GET',
  });
  const forecastWeatherResponse = await forecastResponse.json();

if (currentResponse.ok) {
  if (forecastResponse.ok) {
    getWeather(currentWeatherResponse, forecastWeatherResponse);
  } else {
    getWeather(currentWeatherResponse, null);
  }
} else if (forecastResponse.ok) {
  getWeather(null, forecastWeatherResponse);
} else {
  weatherBlock.innerHTML = currentWeatherResponse.message;
}
}

function getWeather(currentData, forecastData) {
  

  const location = currentData ? currentData.name : forecastData.city.name;
  const today = new Date();
  function getCurrentTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // <------------- Retrieve the current weather conditions ------------->
  const currentWeatherData = Math.round(currentData.main.temp);
  const currentFeelsLike = Math.round(currentData.main.feels_like);
  const currentWeatherStatus = currentData.weather[0].main;
  const currentWeatherIcon = currentData.weather[0].icon;

  // <------------- Retrieve the future weather conditions ------------->

  
  const filteredForecastData = forecastData.list.filter(item => {
    return item.dt_txt.includes ('03:00') || item.dt_txt.includes ('12:00');
  });

  

  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);

  const template = `
  <div class="weather-header">
    <div class="weather-city">${location}</div>
    <div class="weather-underline"></div>
    <div class="current-weather-body_block">
      <span class="weather-day">${today.toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <div class="weather-temp">
        <span class="weather-time-date">
        <p>Time: ${getCurrentTime()}, Temperature: ${currentWeatherData} °C</p>          
        <p>Feels like: ${currentFeelsLike} °C</p>      
        <p class="cloudiness">Cloudiness: ${currentWeatherStatus} <img src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" alt="${currentWeatherStatus}"> </p>
        </span>
      </div>
    </div>
  </div>
  <div class="weather-body">
    
    
    <div class="weather-body_block">
      <span class="weather-day">${new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <div class="weather-temp">
        <span class="weather-time-date">
          <p>3:00  ${Math.round(filteredForecastData[0].main.temp)}°C</p>
          
          <p>12:00  ${Math.round(filteredForecastData[1].main.temp)}°C</p>
        </span>
      </div>
    </div>
    <div class="weather-body_block">
      <span class="weather-day">${new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <div class="weather-temp">
        <span class="weather-time-date">
          <p>3:00  ${Math.round(filteredForecastData[2].main.temp)}°C</p>
          
          <p>12:00  ${Math.round(filteredForecastData[3].main.temp)}°C</p>
        </span>
      </div>
    </div>
    <div class="weather-body_block">
      <span class="weather-day">${new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <div class="weather-temp">
        <span class="weather-time-date">
          <p>3:00  ${Math.round(filteredForecastData[4].main.temp)}°C</p>
          
          <p>12:00  ${Math.round(filteredForecastData[5].main.temp)}°C</p>
        </span>
      </div>
    </div>
    <div class="weather-body_block">
      <span class="weather-day">${new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <div class="weather-temp">
        <span class="weather-time-date">
        <p>3:00  ${Math.round(filteredForecastData[6].main.temp)}°C</p>
        
        <p>12:00  ${Math.round(filteredForecastData[7].main.temp)}°C</p>
        </span>
      </div>
    </div>
  </div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
