const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = wrapper.querySelector(".weather-part img"),
  btnBack = wrapper.querySelector("header i");

const apiKey = "02c2f17449b88af15848c2d5de76e154";
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your brower not support geolacation api");
  }
};

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pedding");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace("pedding", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      wIcon.src = "/weather-app/icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "/weather-app/icons/strom.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "/weather-app/icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "/weather-app/icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "/weather-app/icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      wIcon.src = "/weather-app/icons/rain.svg";
    }

    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    weatherPart.querySelector(".feels .temp .numb").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(
      ".humidity .temp .numb"
    ).innerText = `${humidity}%`;

    infoTxt.classList.remove("pedding", "error");
    wrapper.classList.add("active");
  }
}

btnBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
  inputField.value = "";
});
