const apiKey = "bbc6decc5279ecc1d434c79a5f27672d";
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

// Function to render weather data to HTML
function renderWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  // Render the data
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${description}</p>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
  `;
}
