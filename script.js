require('dotenv').config()

// API_KEY for maps api
const API_KEY = process.env.API_KEY;

// get 
const searchButton = document.getElementById('searchButton')
const cityName = document.getElementById('cityName')
const weatherDescription = document.getElementById('weatherDescription')
const weatherInformation = document.getElementById('weatherInformation')
const weatherImage = document.getElementById('weatherImage')
const temp = document.getElementById('temp')
const cityAndCountry = document.getElementById('cityAndCountry')


getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";

  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;

  fetch(FULL_URL)
  .then(response => response.json())
  .then(response => {
    const weatherData = response
    showWeatherData(weatherData)
  })
}

const showWeatherData = (weatherData) => {

  const description = `${weatherData.weather[0].main}`
  const cityTemp = `${Math.ceil(weatherData.main.temp)}\xB0`
  const humidity = weatherData.main.humidity

  const allWeatherInfoTitles = ['Current Temp: ', 'Min temp: ', 'Max temp: ']
  const allWeatherInfo = [weatherData.main.temp, weatherData.main.temp_min, weatherData.main.temp_max]

  let result = allWeatherInfoTitles.map(function(a, i) {
    return [`${a} ${allWeatherInfo[i]}\xB0 &emsp; &emsp;`].join('')
  }).join(' ')

  const rainyGif = ['https://img.icons8.com/color/512/downpour--v1.png']
  const clearGif = ['https://cdn-icons-png.flaticon.com/512/831/831682.png']
  const cloudsGif = ['https://cdn-icons-png.flaticon.com/512/4834/4834559.png']
  const mistGif = ['https://static.thenounproject.com/png/1512648-200.png']

  switch (description) {
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      weatherImage.innerHTML = `<img src='${rainyGif}'>`;
      break;
    case 'Clear':
      weatherImage.innerHTML = `<img src='${clearGif}'>`;
      break;
    case 'Clouds':
      weatherImage.innerHTML = `<img src='${cloudsGif}'>`;
      break;
      case 'Mist':
        weatherImage.innerHTML = `<img src='${mistGif}'>`;
        break;
  }
  
  temp.innerHTML = cityTemp

  weatherDescription.innerHTML = description

  weatherInformation.innerHTML = result

  cityAndCountry.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`

}

const cityInput = document.getElementById('cityInput')

searchButton.onclick = () => getWeatherData(cityInput.value)