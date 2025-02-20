require("dotenv").config();

const apiKey = process.env.API_KEY;
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city); // Call the API
  } else {
    alert("Please enter a city name");
  }
});

// Event listener for Enter key press
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter a city name");
    }
  }
});

// Function to fetch weather data using fetch()
async function fetchWeather(city) {
  loading.style.display = "block"; // Show loading spinner
  weatherResult.innerHTML = ""; // Clear previous results

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url); // Call API
    const data = await response.json(); // Parse JSON response

    if (data.cod === 200) {
      renderWeather(data); // Render data to HTML
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

// Function to render weather data to HTML
function renderWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  // Render the data in the carousel
  weatherResult.innerHTML = `
    <div class="carousel-item active">
      <div class="d-flex justify-content-between align-items-center px-5 gradient-custom" style="height: 230px">
        <div>
          <h2 class="text-dark display-2"><strong>${temperature}°C</strong></h2>
          <p class="text-dark mb-0">${name}</p>
        </div>
        <div>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="150px">
        </div>
      </div>
    </div>
  `;
}

// Function to render weather data to HTML
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
      <button
        type="button"
        data-mdb-target="#weatherCarousel"
        data-mdb-slide-to="2"
        class="bg-secondary"
        aria-label="Slide 3"
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
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="150px">
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-flex justify-content-around text-center align-items-center px-5 bg-body-tertiary" style="height: 230px">
          <div class="flex-column">
            <p class="small"><strong>21°C</strong></p>
            <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>12:00</strong></p>
            <p class="mb-0 text-muted" style="font-size: .65rem;">PM</p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>2°C</strong></p>
            <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>1:00</strong></p>
            <p class="mb-0 text-muted" style="font-size: .65rem;">PM</p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>20°C</strong></p>
            <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>2:00</strong></p>
            <p class="mb-0 text-muted" style="font-size: .65rem;">PM</p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>19°C</strong></p>
            <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>3:00</strong></p>
            <p class="mb-0 text-muted" style="font-size: .65rem;">PM</p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>18°C</strong></p>
            <i class="fas fa-cloud-showers-heavy fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>4:00</strong></p>
            <p class="mb-0 text-muted" style="font-size: .65rem;">PM</p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-flex justify-content-around text-center align-items-center px-5 bg-body-tertiary" style="height: 230px">
          <div class="flex-column">
            <p class="small"><strong>21°C</strong></p>
            <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>Mon</strong></p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>20°C</strong></p>
            <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>Tue</strong></p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>16°C</strong></p>
            <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>Wed</strong></p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>17°C</strong></p>
            <i class="fas fa-cloud fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>Thu</strong></p>
          </div>
          <div class="flex-column">
            <p class="small"><strong>18°C</strong></p>
            <i class="fas fa-cloud-showers-heavy fa-2x mb-3" style="color: #ddd;"></i>
            <p class="mb-0"><strong>Fri</strong></p>
          </div>
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
  const carousel = new mdb.Carousel(document.getElementById("weatherCarousel"));
}
