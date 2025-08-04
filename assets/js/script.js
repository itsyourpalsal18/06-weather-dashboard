const apiKey = "API"; // replace this with your real OpenWeather API key
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
            displayCurrentWeather(data);
            getForecast(city); // ✅ Call it here, once!
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

function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Forecast not found.");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data); // ✅ Correct function call
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
        });
}


function displayForecast(data) {
    const forecastEl = document.getElementById("forecast");
    const forecastCardsEl = document.getElementById("forecast-cards");
    
    forecastCardsEl.innerHTML = ""; // Clear old forecasts
    forecastEl.classList.remove("d-none");

    // Filter for one forecast per day at 12:00:00
    const dailyData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("col-md-2", "card", "bg-info", "text-white", "m-2", "p-2");

        const date = dayjs(day.dt_txt).format("M/D/YYYY");
        const icon = day.weather[0].icon;
        const temp = day.main.temp;
        const wind = day.wind.speed;
        const humidity = day.main.humidity;

        card.innerHTML = `
            <h5>${date}</h5>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
            <p>🌡️ ${temp}°F</p>
            <p>💨 ${wind} MPH</p>
            <p>💧 ${humidity}%</p>
        `;

        forecastCardsEl.appendChild(card);
    });
}
