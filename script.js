import Data from "./config.js";
const searchBtn = document.getElementById("searchImg");
const cityInput = document.getElementById("cityInput");
const featureForecast = document.querySelector(".featureForecast");
const currentDateTime = document.getElementById("currentDateTime");
const currentWeatherImg = document.getElementById("currentWeatherImg");
const currentCelsius = document.getElementById("currentCelsius");
const currentCityName = document.getElementById("currentCityName");
const dateAndTimeInsearChedCity = document.getElementById(
  "dateAndTimeInsearChedCity"
);
const descriptionP = document.getElementById("descriptionP");
const decsciptionImg = document.getElementById("descriptionImg");
const unsplashImg = document.getElementById("unsplashImg");
const locationImg = document.getElementById("locationImg");
const forecastWeelDayP = document.querySelectorAll("#forecastWeekDayP");
const forecastImg = document.querySelectorAll("#forecastImg");
const forecastTemp = document.querySelectorAll("#forecastTemp");
const forecastDiv = document.querySelectorAll(".forecastDiv");
const errorTxt = document.getElementById("errorTxt");
const currentFeelsLike = document.getElementById("currentFeelsLike");
const windTxt = document.getElementById("windTxt");
const bottomWindImg = document.getElementById("bottomWindImg");
const bottomCardDiv = document.querySelectorAll(".bottomCardDiv");
const sunRiseIcon = document.getElementById("sunRiseIcon");
const sunRiseTxt = document.getElementById("sunRiseTxt");
const sunSetTxt = document.getElementById("sunSetTxt");
const humidityIcon = document.getElementById("humidityIcon");
const humidityTxt = document.getElementById("humidityTxt");
const visibilityTxt = document.getElementById("visibilityTxt");
const pressureIcon = document.getElementById("pressureIcon");
const pressureTxt = document.getElementById("pressureTxt");
const countryIcon = document.getElementById("countryIcon");
const countryTxt = document.getElementById("countryTxt");
const forecastMain = document.querySelectorAll("#forecastMain");
const todaysHilight = document.getElementById("todaysHilight");
const line = document.querySelector(".line");
const date = new Date();
let nextFiveDays = [];
let dataWithoutTodaysWeather = [];
// getting current date and time for to compare with forecast date and time
const getCurrentDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hours = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  let seconds = String(currentDate.getSeconds()).padStart(2, "0");
  let formattedDate = `${year}-${month}-${day} `;
  return formattedDate;
};
getCurrentDate();

//calculating next 5 days
let fiveDays = [];
const calculateFiveDays = () => {
  for (let i = 0; i < 5; i++) {
    date.setDate(date.getDate() + 1);
    let formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    fiveDays.push(formattedDate);
  }
  fiveDays;
  return fiveDays;
};
calculateFiveDays();

let nextDays = {
  day1: fiveDays[0],
  day2: fiveDays[1],
  day3: fiveDays[2],
  day4: fiveDays[3],
  day5: fiveDays[4],
};

setInterval(() => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hours = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  let seconds = String(currentDate.getSeconds()).padStart(2, "0");
  let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  currentDateTime.textContent = formattedDate;
}, 1000);

const performSearch = () => {
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${Data.weatherApiKey}`;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Data.weatherApiKey}`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${Data.uNsplashApiKey}`;

  getWeather(url);
  fetchCurrentWeather(currentUrl, unsplashUrl);
  calculateNextfiveDays();
};

// search btn
searchBtn.addEventListener("click", performSearch);

// getting input value  from the input
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

//fetching 5 days forecast
const getWeather = (url) => {
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      data;
      data;
      displayFiveDaysForecast(data);
    });
};
// fetching current weather and unsplash api
const fetchCurrentWeather = async (currentUrl, unsplashUrl) => {
  fetch(currentUrl).then((Response) => {
    if (Response.ok) {
      Response.json().then((data) => {
        data;
        data;
        fetch(unsplashUrl).then((Response) => {
          if (Response.ok) {
            Response.json().then((unsplashData) => {
              unsplashData;
              unsplashData;
              displeyCurrentWeather(data, unsplashData);
            });
          } else {
            alert("Error");
          }
        });
      });
    } else {
      alert("Error");
    }
  });
};
// displaying current weather and unsplash img
const displeyCurrentWeather = (data, unsplashData) => {
  currentCityName.textContent = data.name;
  currentWeatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  currentCelsius.textContent = `${Math.round(data.main.temp)}°C`;
  let timeZone = data.timezone / 3600;
  currentFeelsLike.textContent = `Feels like ${Math.round(
    data.main.feels_like
  )}°C`;
  timeZone;
  const calculateTime = (timeZone) => {
    let date = new Date();
    let utc = date.getTime() + date.getTimezoneOffset() * 60000;
    let newDate = new Date(utc + 3600000 * timeZone);
    let newTime = newDate.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let newDay = newDate.toLocaleString("en-us", {
      weekday: "long",
    });
    return newDay + "," + newTime;
  };
  dateAndTimeInsearChedCity.textContent = calculateTime(timeZone);
  decsciptionImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  descriptionP.textContent = data.weather[0].description;
  unsplashImg.style.display = "block";
  if (unsplashData.results.length === 0) {
    errorTxt.textContent = "No image found";
    unsplashImg.style.display = "none";
  } else {
    errorTxt.textContent = "";
    let random = Math.floor(Math.random() * unsplashData.results.length);
    unsplashImg.src = unsplashData.results[random].urls.regular;
  }
  unsplashData;
  bottomCardDiv.forEach((item) => {
    item.style.display = "flex";
  });
  windTxt.textContent = `${data.wind.speed} km/h`;
  bottomWindImg.src = "./assets/wind-icon.gif";
  sunRiseIcon.src = "./assets/sunrise-icon.gif";

  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  // Convert sunrise timestamp to Date object
  const sunriseDate = new Date(sunriseTimestamp * 1000);
  // Extract hours and minutes from the sunrise date
  const sunriseHours = sunriseDate.getHours();
  const sunriseMinutes = sunriseDate.getMinutes();

  // Convert sunset timestamp to Date object
  const sunsetDate = new Date(sunsetTimestamp * 1000);
  // Extract hours and minutes from the sunset date
  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = sunsetDate.getMinutes();

  // Format the sunrise and sunset times as strings
  const sunriseTime = `${sunriseHours
    .toString()
    .padStart(2, "0")}:${sunriseMinutes.toString().padStart(2, "0")}`;
  const sunsetTime = `${sunsetHours.toString().padStart(2, "0")}:${sunsetMinutes
    .toString()
    .padStart(2, "0")}`;
  sunRiseTxt.textContent = `Sunrise:${sunriseTime} `;
  sunSetTxt.textContent = `Sunset:${sunsetTime} `;
  humidityIcon.src = "./assets/humidity-icon.gif";
  humidityTxt.textContent = `${data.main.humidity}%`;
  visibilityTxt.textContent = `${data.visibility / 1000} km`;
  pressureIcon.src = "./assets/humidity-icon.gif";
  pressureTxt.textContent = `${data.main.pressure} hPa`;
  countryIcon.src = "./assets/country-icon.png";
  countryTxt.textContent = data.sys.country;
};

// getting current location pressing location btn , for this moment I have problem
const currentLocation = async () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=8647bf204b39049e6b810369f26c3e9c`;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8647bf204b39049e6b810369f26c3e9c`;

    getWeather(url);
    calculateNextfiveDays();
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          data;
          const unsplashUrl = `https://api.unsplash.com/search/photos?query=${data.city}&client_id=${Data.uNsplashApiKey}`;
          fetchCurrentWeather(currentUrl, unsplashUrl);
        });
      } else {
        alert("Error");
      }
    });
  };

  const error = () => {
    alert("Unable to retrieve your location");
  };

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  } else {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      success(position);
    } catch (e) {
      error();
    }
  }
};

locationImg.addEventListener("click", currentLocation);
// calculating next 5 weekdays
const calculateNextfiveDays = () => {
  let date = new Date();
  for (let i = 0; i < 5; i++) {
    let nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000 * (i + 1));
    nextFiveDays.push(nextDay);
  }
  nextFiveDays;
  nextFiveDays.toLocaleString("en-us", {
    weekday: "long",
  });
  return nextFiveDays;
};

// displaying 5 days forecast
const displayFiveDaysForecast = (data) => {
  line.style.display = "block";
  todaysHilight.style.display = "block";
  forecastWeelDayP.forEach((day, index) => {
    day.textContent = new Date(nextFiveDays[index]).toLocaleString("en-us", {
      weekday: "long",
    });
  });
  forecastDiv.forEach((div) => {
    div.style.display = "flex";
  });
  let dataWithoutToday = [];
  data.list.forEach((element, index) => {
    let dateFromList = new Date(data.list[index].dt_txt);
    let today = new Date();
    if (dateFromList.getDate() === today.getDate()) {
      element.dt_txt;
    } else {
      dataWithoutToday.push(element);
    }
  });
  dataWithoutToday;
  //extracting data for each day for next 5 days for 3 hours min and max temp icon and description
  let day1 = [];
  let day2 = [];
  let day3 = [];
  let day4 = [];
  let day5 = [];
  let extracTedData = {};

  dataWithoutToday.forEach((element, index) => {
    let dateFromList = new Date(dataWithoutToday[index].dt_txt);
    let today = new Date();
    if (dateFromList.getDate() === today.getDate() + 1) {
      day1.push(element);
    } else if (dateFromList.getDate() === today.getDate() + 2) {
      day2.push(element);
    } else if (dateFromList.getDate() === today.getDate() + 3) {
      day3.push(element);
    } else if (dateFromList.getDate() === today.getDate() + 4) {
      day4.push(element);
    } else if (dateFromList.getDate() === today.getDate() + 5) {
      day5.push(element);
    }
    extracTedData.day1 = day1;
    extracTedData.day2 = day2;
    extracTedData.day3 = day3;
    extracTedData.day4 = day4;
    extracTedData.day5 = day5;
  });
  extracTedData;

  // get min and max temp for each day
  let minMaxDay1 = [];
  let minMaxDay2 = [];
  let minMaxDay3 = [];
  let minMaxDay4 = [];
  let minMaxDay5 = [];

  for (let i = 0; i < extracTedData.day1.length; i++) {
    minMaxDay1.push(
      extracTedData.day1[i].main.temp_min,
      extracTedData.day1[i].main.temp_max
    );
    forecastTemp[0].textContent = `${Math.round(
      Math.max(...minMaxDay1)
    )}°/${Math.round(Math.min(...minMaxDay1))}°`;
  }
  for (let i = 0; i < extracTedData.day2.length; i++) {
    minMaxDay2.push(
      extracTedData.day2[i].main.temp_min,
      extracTedData.day2[i].main.temp_max
    );
    forecastTemp[1].textContent = `${Math.round(
      Math.max(...minMaxDay2)
    )}°/${Math.round(Math.min(...minMaxDay2))}°`;
  }
  for (let i = 0; i < extracTedData.day3.length; i++) {
    minMaxDay3.push(
      extracTedData.day3[i].main.temp_min,
      extracTedData.day3[i].main.temp_max
    );
    forecastTemp[2].textContent = `${Math.round(
      Math.max(...minMaxDay3)
    )}°/${Math.round(Math.min(...minMaxDay3))}°`;
  }
  for (let i = 0; i < extracTedData.day4.length; i++) {
    minMaxDay4.push(
      extracTedData.day4[i].main.temp_min,
      extracTedData.day4[i].main.temp_max
    );
    forecastTemp[3].textContent = `${Math.round(
      Math.max(...minMaxDay4)
    )}°/${Math.round(Math.min(...minMaxDay4))}°`;
  }
  for (let i = 0; i < extracTedData.day5.length; i++) {
    minMaxDay5.push(
      extracTedData.day5[i].main.temp_min,
      extracTedData.day5[i].main.temp_max
    );
    forecastTemp[4].textContent = `${Math.round(
      Math.max(...minMaxDay5)
    )}°/${Math.round(Math.min(...minMaxDay5))}°`;
  }
  // get icon for each day
  let iconDay1 = [];
  let iconDay2 = [];
  let iconDay3 = [];
  let iconDay4 = [];
  let iconDay5 = [];

  for (let i = 0; i < extracTedData.day1.length; i++) {
    iconDay1.push(extracTedData.day1[i].weather[0].icon);
    // forecastIcon[0].src = `http://openweathermap.org/img/wn/${iconDay1[0]}.png`;
    forecastImg[0].src = `http://openweathermap.org/img/wn/${iconDay1[5]}.png`;
  }
  for (let i = 0; i < extracTedData.day2.length; i++) {
    iconDay2.push(extracTedData.day2[i].weather[0].icon);
    forecastImg[1].src = `http://openweathermap.org/img/wn/${iconDay2[5]}.png`;
  }
  for (let i = 0; i < extracTedData.day3.length; i++) {
    iconDay3.push(extracTedData.day3[i].weather[0].icon);
    forecastImg[2].src = `http://openweathermap.org/img/wn/${iconDay3[5]}.png`;
  }
  for (let i = 0; i < extracTedData.day4.length; i++) {
    iconDay4.push(extracTedData.day4[i].weather[0].icon);
    forecastImg[3].src = `http://openweathermap.org/img/wn/${iconDay4[5]}.png`;
  }
  for (let i = 0; i < extracTedData.day5.length; i++) {
    iconDay5.push(extracTedData.day5[i].weather[0].icon);
    forecastImg[4].src = `http://openweathermap.org/img/wn/${iconDay5[2]}.png`;
  }
  // get description for each day
  let descriptionDay1 = [];
  let descriptionDay2 = [];
  let descriptionDay3 = [];
  let descriptionDay4 = [];
  let descriptionDay5 = [];

  for (let i = 0; i < extracTedData.day1.length; i++) {
    descriptionDay1.push(extracTedData.day1[i].weather[0].main);
    forecastMain[0].textContent = descriptionDay1[5];
  }
  for (let i = 0; i < extracTedData.day2.length; i++) {
    descriptionDay2.push(extracTedData.day2[i].weather[0].main);
    forecastMain[1].textContent = descriptionDay2[5];
  }
  for (let i = 0; i < extracTedData.day3.length; i++) {
    descriptionDay3.push(extracTedData.day3[i].weather[0].main);
    forecastMain[2].textContent = descriptionDay3[5];
  }
  for (let i = 0; i < extracTedData.day4.length; i++) {
    descriptionDay4.push(extracTedData.day4[i].weather[0].main);
    forecastMain[3].textContent = descriptionDay4[5];
  }
  for (let i = 0; i < extracTedData.day5.length; i++) {
    descriptionDay5.push(extracTedData.day5[i].weather[0].main);
    forecastMain[4].textContent = descriptionDay5[2];
  }
};
