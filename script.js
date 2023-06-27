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

const date = new Date();

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
  let weatherApiKey = "8647bf204b39049e6b810369f26c3e9c";
  let uNsplashApiKey = "zBVIB3obWPPTBMPk9nU7mSOqlsUAa3uY2TNlZhvegbY";
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${uNsplashApiKey}`;

  getWeather(url);
  fetchCurrentWeather(currentUrl, unsplashUrl);
};

searchBtn.addEventListener("click", performSearch);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

const getWeather = (url) => {
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
    });
};

const fetchCurrentWeather = async (currentUrl, unsplashUrl) => {
  fetch(currentUrl).then((Response) => {
    if (Response.ok) {
      Response.json().then((data) => {
        fetch(unsplashUrl).then((Response) => {
          if (Response.ok) {
            Response.json().then((unsplashData) => {
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

const displeyCurrentWeather = (data, unsplashData) => {
  currentCityName.textContent = data.name;
  currentWeatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  currentCelsius.textContent = `${Math.round(data.main.temp)}°C`;
  let timeZone = data.timezone / 3600;
  console.log(timeZone);
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

  unsplashImg.src = unsplashData.results[0].urls.small;
  console.log(unsplashData);
};

const currentLocation = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8647bf204b39049e6b810369f26c3e9c`;
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${latitude},${longitude}&client_id=zBVIB3obWPPTBMPk9nU7mSOqlsUAa3uY2TNlZhvegbY`;
    fetchCurrentWeather(currentUrl, unsplashUrl);
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
