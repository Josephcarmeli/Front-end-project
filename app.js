let button = document.querySelector(".button");
let inputValue = document.querySelector(".inputValue");
let nameEl = document.querySelector(".name");
let descEl = document.querySelector(".descEl");
let tempEl = document.querySelector(".temp");
let selectedUnit = document.querySelector('input[name="units"]:checked').value;
let currentLocationBtn = document.querySelector(".location-button")
let audio = document.querySelector(".audio");
let playButton = document.getElementById("play-audio");

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "Pause Audio";
  } else {
    audio.pause();
    playButton.textContent = "Play Audio";
  }
}

function getData(response) {
  console.log(response);
  nameEl.textContent = response.data.name;
  descEl.textContent = response.data.weather[0].description;
  if (selectedUnit === "metric") {
      tempEl.textContent = response.data.main.temp + "°C";
  } else {
      tempEl.textContent = response.data.main.temp + "°F";
  }
}

playButton.addEventListener("click", toggleAudio);

document.querySelectorAll('input[name="units"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
      selectedUnit = this.value;
      button.click();
    });
  });

  button.addEventListener("click", () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=3b198bf6856a18a221a056cee186c32a&units=${selectedUnit}`)
    .then(getData)
      .catch(function (error) {
        console.log(error);
      });
  });

  currentLocationBtn.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b198bf6856a18a221a056cee186c32a&units=${selectedUnit}`)
                .then(getData)
                .catch(function (error) {
                    console.log(error);
                });
        });
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  });