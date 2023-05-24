require('dotenv').config()

// get API key from envrioment variable
const API_KEY = process.env.API_KEY;

// assigning references to HTML elements
const searchButton = document.getElementById('searchButton')
// const cityName = document.getElementById('cityName')
const weatherDescription = document.getElementById('weatherDescription')
const weatherInformation = document.getElementById('weatherInformation')
const weatherImage = document.getElementById('weatherImage')
const temp = document.getElementById('temp')
const cityAndCountry = document.getElementById('cityAndCountry')
const cityInput = document.getElementById('cityInput')


// fetch weather data from OpenWeatherMap API for given city
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

// displaying the weather data on the webpage
const showWeatherData = (weatherData) => {

  // extracting various weather information
  const description = `${weatherData.weather[0].main}`
  const cityTemp = `${Math.ceil(weatherData.main.temp)}\xB0`
  

  // display weather information titles and values
  const allWeatherInfoTitles = ['Current Temp: ', 'Min temp: ', 'Max temp: ']
  const allWeatherInfo = [weatherData.main.temp, weatherData.main.temp_min, weatherData.main.temp_max]

  let result = allWeatherInfoTitles.map(function(a, i) {
    return [`${a} ${allWeatherInfo[i]}\xB0 &emsp; &emsp;`].join('')
  }).join(' ')


  // URLs for different weather conditions
  const rainyGif = ['https://img.icons8.com/color/512/downpour--v1.png']
  const clearGif = ['https://cdn-icons-png.flaticon.com/512/831/831682.png']
  const cloudsGif = ['https://cdn-icons-png.flaticon.com/512/4834/4834559.png']
  const mistGif = ['https://static.thenounproject.com/png/1512648-200.png']

  // displaying the images based on the weather description
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
  
  // update the HTML elements with the weather data
  temp.innerHTML = cityTemp
  weatherDescription.innerHTML = description
  weatherInformation.innerHTML = result
  cityAndCountry.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`

}

// event listener to search button to retrive weather data
searchButton.onclick = () => getWeatherData(cityInput.value)