const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputCity = $('#input-city')
const btnSearch = $('#btn-search')
const textError = $('.text-error')
const cityName = $('.city-name')
const imgIcon = $('#img-icon')
const temperature = $('.temperature')
const doam = $('.doam')
const numbTemperature = $('.numb-temperature')


let country = ''
const apiKey = '06e0ba0ffd7a042c3a1f2881d3fee86e'

async function getApi(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  const data = await response.json()
  console.log(data);
  weatherDetails(data)
}

function weatherDetails(data) {
  if (data.cod === '404') {
    textError.style.display = 'block'
    textError.textContent = `${country} isn't a valid city name!`
    inputCity.value = ''
  } else {
    textError.style.display = 'none'
    cityName.textContent = `${data.name}, ${data.sys.country}`

    const { description, id } = data.weather[0];
    const { feels_like, humidity, temp } = data.main;

    if (id == 800) {
      imgIcon.src = "./icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      imgIcon.src = "./icons/strom.svg";
    } else if (id >= 600 && id <= 622) {
      imgIcon.src = "./icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      imgIcon.src = "./icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      imgIcon.src = "./icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      imgIcon.src = "./icons/rain.svg";
    }

    temperature.textContent = Math.floor(temp)
    numbTemperature.textContent = Math.floor(feels_like)
    doam.textContent = Math.floor(humidity)
    inputCity.value = ''
  }
}

btnSearch.onclick = () => {
  country = inputCity.value
  getApi(country)
}