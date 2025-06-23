document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-name');
    const getbtn = document.getElementById('gt-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityOutput = document.getElementById("city-output");
    const temp = document.getElementById("temp");
    const desc = document.getElementById("desc");
    const errmsg = document.getElementById("error-msg");
    const humidity = document.getElementById("humidity");

    const API_KEY = "201e6d9fe39b5262d0c6237d65ccc5d5";

    getbtn.addEventListener('click', async () => {
        const cityN = cityInput.value.trim();
        if (!cityN) return;

        try {
            const weatherData = await fetchWeatherData(cityN);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(cityN) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(weatherData) {
        weatherInfo.classList.remove('hidden');
        errmsg.classList.add('hidden');

        cityOutput.textContent = weatherData.name;
        temp.textContent = ` Temperature: ${weatherData.main.temp}°C`;
         humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        desc.textContent = ` Condition: ${weatherData.weather[0].description}`;
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errmsg.classList.remove('hidden');
    }
});
