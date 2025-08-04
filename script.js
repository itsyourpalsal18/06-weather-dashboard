const apiKey = "enter api key"; // replace this with your real OpenWeather API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  console.log("Fetching weather for:", city);
}