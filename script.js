const apiKey = `0fd9502a75eb17b39e72e6d06a1e3848`;

async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    console.log(data.main.temp);
    updateWeatherUI(data);
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const visibilityDistance = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const dateElement = document.querySelector(".date");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    visibilityDistance.textContent = `${data.visibility / 1000} Km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
}

document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector(".search-form");
    const inputElement = document.querySelector(".city-input");
    formElement.addEventListener("submit", function(e) {
        e.preventDefault();
        const city = inputElement.value;
        if (city !== "") {
            fetchWeatherData(city);
			inputElement.value="";
        }
    });
});
