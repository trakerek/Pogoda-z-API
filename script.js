function getWeather() {
    const apiKey = 'YOUR-API-KEY';
    const city = document.getElementById('city-input').value;
    if(!city){
        alert('Podaj miasto');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Błąd pobierania pogody:', error);
            alert('Błąd pobierania pogody');
        });

    // fetch(forecastUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.cod === '404') {
    //             console.error('Błąd pobierania prognozy pogody:', data.message);
    //             alert('Błąd pobierania prognozy pogody');
    //             return;
    //         }
    //         displayHourlyForecast(data.list);
    //     })
    //     .catch(error => {
    //         console.error('Błąd pobierania prognozy pogody:', error);
    //         alert('Błąd pobierania prognozy pogody');
    //     });
}
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-info');
    const weatherInfoDIv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    weatherInfoDIv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDIv.innerHTML = `<p>Brak danych dla miasta ${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>Temperatura: ${temperature}°C</p>`;
        const weatherHTML = `<p>Pogoda: ${cityName}</p> <p> ${description}</p>`;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDIv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();
    }
    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24hours = hourlyData.slice(0, 8);
        next24hours.forEach(item => {
            const dataTime = new Date(item.dt * 1000);
            const hour = dataTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const hourlyItemHtml = `<div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }
    function showImage() {
        const image = document.getElementById('weather-icon');
        image.style.display = 'block';
    }
}
