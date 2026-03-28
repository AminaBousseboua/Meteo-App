const apiKey = "7f09c1fa3e9e956281c9a00a2618ebc2"; // <--- REMPLACE CECI PAR TA CLÉ
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Changer l'icône selon la météo
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

// Permettre la recherche avec la touche "Entrée"
searchBox.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      checkWeather(searchBox.value);
    }
});