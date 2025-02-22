const apiKey = "bbc6decc5279ecc1d434c79a5f27672d";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city); // Fetch current weather
    fetchForecast(city); // Fetch 5-day forecast
  } else {
    alert("Please enter a city name");
  }
});

// Event listener for Enter key press
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city); // Fetch current weather
      fetchForecast(city); // Fetch 5-day forecast
    } else {
      alert("Please enter a city name");
    }
  }
});

// Function to fetch current weather data
async function fetchWeather(city) {
  loading.style.display = "block"; // Show loading spinner
  weatherResult.innerHTML = ""; // Clear previous results

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url); // Call API
    const data = await response.json(); // Parse JSON response

    if (data.cod === 200) {
      renderWeather(data); // Render current weather
    } else {
      weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherResult.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    loading.style.display = "none"; // Hide loading spinner
  }
}

// Function to fetch 5-day forecast data
async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url); // Call API
    const data = await response.json(); // Parse JSON response

    if (data.cod === "200") {
      renderForecast(data.list); // Render 5-day forecast
    } else {
      console.error("Forecast not available.");
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Function to render current weather data
function renderWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  // Render the data in the carousel
  weatherResult.innerHTML = `
    <div class="carousel-indicators">
      <button
        type="button"
        data-mdb-target="#weatherCarousel"
        data-mdb-slide-to="0"
        class="active bg-secondary"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-mdb-target="#weatherCarousel"
        data-mdb-slide-to="1"
        class="bg-secondary"
        aria-label="Slide 2"
      ></button>
    </div>
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
      <!-- Slide 2: 5-Day Forecast -->
      <div class="carousel-item">
        <div class="d-flex justify-content-around text-center align-items-center px-5 bg-body-tertiary" style="height: 230px" id="forecastSlide">
          <!-- 5-Day Forecast will be rendered here -->
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-mdb-target="#weatherCarousel"
      data-mdb-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-mdb-target="#weatherCarousel"
      data-mdb-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;

  // Initialize the carousel (required for MDBootstrap)
  if (typeof mdb !== "undefined") {
    const carousel = new mdb.Carousel(
      document.getElementById("weatherCarousel")
    );
  } else {
    console.error("MDBootstrap is not loaded.");
  }
}

// Function to render 5-day forecast data
function renderForecast(forecastList) {
  const forecastSlide = document.getElementById("forecastSlide");

  // Filter the forecast data to get one entry per day
  const dailyForecast = forecastList.filter((item, index) => index % 8 === 0);

  // Render the forecast cards inside Slide 2
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
