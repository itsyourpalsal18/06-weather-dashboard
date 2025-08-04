const apiKey = "API Key"; // replace this with your real OpenWeather API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});


function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => {
        if (!response.ok) {
            throw new Error("City not found.");
        }
        return response.json();
        })
        .then(data => {
        console.log(data); // for testing
        displayCurrentWeather(data);
        })
        .catch(error => {
        console.error("Error fetching weather:", error);
        alert("Could not fetch weather for that city.");
        });
}

function displayCurrentWeather(data) {
    
    console.log("Displaying weather for:", data.name); // <— TEST LINE

    const currentWeatherEl = document.getElementById("current-weather");
    const cityEl = document.getElementById("current-city");
    const tempEl = document.getElementById("current-temp");
    const humidityEl = document.getElementById("current-humidity");
    const windEl = document.getElementById("current-wind");

    cityEl.textContent = `${data.name} (${dayjs().format("M/D/YYYY")})`;
    tempEl.textContent = `🌡️ Temp: ${data.main.temp}°F`;
    humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;
    windEl.textContent = `🌬️ Wind: ${data.wind.speed} MPH`;

    currentWeatherEl.classList.remove("d-none");
}