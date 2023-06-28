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
const date = new Date();
let weatherApiKey = "8647bf204b39049e6b810369f26c3e9c";
let uNsplashApiKey = "zBVIB3obWPPTBMPk9nU7mSOqlsUAa3uY2TNlZhvegbY";
let nextFiveDays = [];
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

const displayFiveDaysForecast = (data) => {
  data;
  forecastWeelDayP.forEach((day, index) => {
    day.textContent = new Date(nextFiveDays[index]).toLocaleString("en-us", {
      weekday: "long",
    });
  });

  forecastDiv.forEach((div) => {
    div.style.display = "flex";
  });
  forecastImg.forEach((img, index) => {
    img.src = `https://openweathermap.org/img/wn/${
      data.list[index + 4].weather[0].icon
    }.png`;
    [index + 4 * 4];
  });
  // forecastTemp.forEach((temp, index) => {
  //   let avaregeTemp =
  //     (data.list[index].main.temp + data.list[index].main.temp) / 2;

  //   temp.textContent = `${Math.round(avaregeTemp)}°C`;
  // });
  for (let i = 4; i < data.list.length; i++) {
    data.list[i].main.temp;
    let maxtemp = data.list[i].main.temp_max;
    let mintemp = data.list[i].main.temp_min;
    let avaregeTemp = (maxtemp + mintemp) / 2;
    avaregeTemp;
    i;
  }
};
