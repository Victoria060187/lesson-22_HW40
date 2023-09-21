function capitalizeCityName(cityName) {
    const words = cityName.split(" ");
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(" ");
}

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "5d066958a60d315387d9492393935c19";
    const cityInput = document.getElementById("cityInput");
    const getWeatherButton = document.getElementById("getWeatherButton");
    const cityNameElement = document.getElementById("cityName");

    getWeatherButton.addEventListener("click", function () {
        const rawCityName = cityInput.value.trim();
        if (rawCityName !== "") {
            const cityName = capitalizeCityName(rawCityName);
            cityNameElement.textContent = cityName;
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("temperature").textContent = data.main.temp;
                    document.getElementById("pressure").textContent = data.main.pressure;
                    document.getElementById("description").textContent = data.weather[0].description;
                    document.getElementById("humidity").textContent = data.main.humidity;
                    document.getElementById("windSpeed").textContent = data.wind.speed;
                    document.getElementById("windDirection").textContent = data.wind.deg;
                    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                })
                .catch(error => {
                    console.error("Error getting weather data:", error);
                });
        }
    });
});