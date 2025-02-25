const apiKey = "bbc6decc5279ecc1d434c79a5f27672d";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

// Function to fetch weather data
async function fetchWeather(city) {
  loading.style.display = "block";
  weatherResult.innerHTML = "";

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    if (weatherData.cod === 200 && forecastData.cod === "200") {
      renderWeather(weatherData);
      renderForecast(forecastData.list);
      document.getElementById("weatherCarousel").style.display = "block";
    } else {
      weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherResult.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    loading.style.display = "none";
  }
}

// Function to render current weather
function renderWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  weatherResult.innerHTML = `
    <div class="carousel-inner rounded-5">
      <div class="carousel-item active">
        <div class="d-flex justify-content-between align-items-center px-5 gradient-custom" style="height: 230px">
          <div>
            <h2 class="text-dark display-2"><strong>${temperature}°C</strong></h2>
            <p class="text-dark mb-0">${name}</p>
          </div>
          <div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="150px">
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-flex justify-content-around text-center align-items-center px-5 bg-body-tertiary" style="height: 230px" id="forecastSlide">
          <!-- 5-Day Forecast will be rendered here -->
        </div>
      </div>
    </div>
  `;

  // Initialize carousel
  if (typeof mdb !== "undefined") {
    new mdb.Carousel(document.getElementById("weatherCarousel"));
  }
}

// Function to render 5-day forecast
function renderForecast(forecastList) {
  const forecastSlide = document.getElementById("forecastSlide");
  const dailyForecast = forecastList.filter((item, index) => index % 8 === 0);

  forecastSlide.innerHTML = dailyForecast
    .map((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const temperature = item.main.temp;
      const icon = item.weather[0].icon;
      const description = item.weather[0].description;

      return `
        <div class="flex-column">
          <p class="small"><strong>${temperature}°C</strong></p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="50px">
          <p class="mb-0"><strong>${date}</strong></p>
          <p class="mb-0 text-muted">${description}</p>
        </div>
      `;
    })
    .join("");
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter a city name");
    }
  }
});
