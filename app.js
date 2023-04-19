let button = document.querySelector(".button");
let inputValue = document.querySelector(".inputValue");
let nameEl = document.querySelector(".name");
let descEl = document.querySelector(".descEl");
let tempEl = document.querySelector(".temp");
let selectedUnit = document.querySelector('input[name="units"]:checked').value;

document.querySelectorAll('input[name="units"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
      selectedUnit = this.value;
      // Call API again with updated unit
      button.click();
    });
  });
  
  button.addEventListener("click", function() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=3b198bf6856a18a221a056cee186c32a&units=${selectedUnit}`)
      .then(function (response) {
        console.log(response);
        nameEl.textContent = response.data.name;
        descEl.textContent = response.data.weather[0].description;
        if (selectedUnit === "metric") {
          tempEl.textContent = response.data.main.temp + "°C";
        } else {
          tempEl.textContent = response.data.main.temp + "°F";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });