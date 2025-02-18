const apiKey = "00da10785180462cbb7180433251702";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("cityName").innerText = data.location.name;
            document.getElementById("temperature").innerText = `${data.current.temp_c}°C`;
            document.getElementById("condition").innerText = data.current.condition.text;
            document.getElementById("weatherIcon").src = data.current.condition.icon;
            document.getElementById("humidity").innerText = data.current.humidity;
            document.getElementById("windSpeed").innerText = data.current.wind_kph;
            document.getElementById("aqi").innerText = data.current.air_quality.pm2_5.toFixed(1);

            changeBackground(data.current.condition.text);
        })
        .catch(error => {
            alert("City not found! Please enter a valid city name.");
        });
}

function changeBackground(condition) {
    let backgroundUrl = "";

    if (condition.includes("Sunny")) {
        backgroundUrl = "url('https://source.unsplash.com/1600x900/?sunny')";
    } else if (condition.includes("Cloudy")) {
        backgroundUrl = "url('https://source.unsplash.com/1600x900/?cloudy')";
    } else if (condition.includes("Rain")) {
        backgroundUrl = "url('https://source.unsplash.com/1600x900/?rain')";
    } else if (condition.includes("Snow")) {
        backgroundUrl = "url('https://source.unsplash.com/1600x900/?snow')";
    } else {
        backgroundUrl = "url('https://source.unsplash.com/1600x900/?weather')";
    }

    document.body.style.backgroundImage = backgroundUrl;
}

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
