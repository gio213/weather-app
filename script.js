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
let weatherApiKey = "8647bf204b39049e6b810369f26c3e9c";
let uNsplashApiKey = "zBVIB3obWPPTBMPk9nU7mSOqlsUAa3uY2TNlZhvegbY";
let nextFiveDays = [];
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

currentDateTime.textContent =
  new Date().toLocaleString("en-us", {
    weekday: "long",
  }) +
  " " +
  new Date().toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

const performSearch = () => {
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherApiKey}`;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${uNsplashApiKey}`;

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
      console.log(data);
      data;
      displayFiveDaysForecast(data);
    });
};
// fetching current weather and unsplash api
const fetchCurrentWeather = async (currentUrl, unsplashUrl) => {
  fetch(currentUrl).then((Response) => {
    if (Response.ok) {
      Response.json().then((data) => {
        console.log(data);
        data;
        fetch(unsplashUrl).then((Response) => {
          if (Response.ok) {
            Response.json().then((unsplashData) => {
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
    unsplashImg.src = unsplashData.results[0].urls.regular;
  }
  unsplashData;
  bottomCardDiv.forEach((item) => {
    item.style.display = "flex";
  });
  windTxt.textContent = `${data.wind.speed} km/h`;
  bottomWindImg.src = "./assets/wind-icon.gif";
  sunRiseIcon.src = "./assets/sunrise-icon.gif";
  // sunRise.textContent = data.sys.sunrise;
  // sunSet.textContent = data.sys.sunset;
  let sunRise = data.sys.sunrise * 1000;
  let sunSet = data.sys.sunset * 1000;
  let sunRiseDate = new Date(sunRise);
  let sunSetDate = new Date(sunSet);
  let sunRiseTime = sunRiseDate.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let sunSetTime = sunSetDate.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  sunRiseTxt.textContent = `Sunrise:${sunRiseTime} `;
  sunSetTxt.textContent = `Sunset:${sunSetTime} `;
  humidityIcon.src = "./assets/humidity-icon.gif";
  humidityTxt.textContent = `${data.main.humidity}%`;
  visibilityTxt.textContent = `${data.visibility / 1000} km`;
  pressureIcon.src = "./assets/humidity-icon.gif";
  pressureTxt.textContent = `${data.main.pressure} hPa`;
  countryIcon.src = "./assets/country-icon.png";
  countryTxt.textContent = data.sys.country;
};

// getting current location pressing location btn , for this moment I have problem
const currentLocation = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = ` https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=8647bf204b39049e6b810369f26c3e9c`;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8647bf204b39049e6b810369f26c3e9c`;

    getWeather(url);
    calculateNextfiveDays();
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    ).then((Response) => {
      if (Response.ok) {
        Response.json().then((data) => {
          data;
          const unsplashUrl = `https://api.unsplash.com/search/photos?query=${data.city}&client_id=${uNsplashApiKey}`;
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
    navigator.geolocation.getCurrentPosition(success, error);
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

  data.list.forEach((item, index) => {
    let dateFromList = new Date(item.dt_txt);
    const dateString = dateFromList.toISOString().split("T")[0];
    // console.log(dateString);

    let today = new Date().toISOString().split("T")[0];
    console.log(today);

    if (dateString == today) {
      return;
    } else {
      console.log(item);
      forecastImg.forEach((img, index) => {
        img.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}.png`;
      });
      forecastTemp.forEach((temp, index) => {
        temp.textContent = `${Math.round(data.list[index].main.temp)}°C`;
      });
      forecastMain.forEach((main, index) => {
        main.textContent = data.list[index].weather[0].description;
      });
    }
  });
};
