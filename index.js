// Toome sisse axios teegi
const axios = require("axios");

// Tallinna koordinaadid Latitude: 59.4370 Longitude: 24.7536.
const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.4370&lon=24.7536";

// Teeme HTTP päringu, user agent peab olema
axios.get(url, {
  headers: {
    "User-Agent": "weatherapp (sirlikont@gmail.com)"
  }
})
.then(response => {
  // Võtame JSON-ist timeseries massiivi
  const timeseries = response.data.properties.timeseries;

  // Käime läbi esimesed 5 kirjet
  for (let i = 0; i < 5; i++) {
    const item = timeseries[i];
    const time = item.time;
    const temp = item.data.instant.details.air_temperature;
    console.log(`${time} ${temp}C`);
  }
})
.catch(error => {
  console.error("Viga päringus:", error.message);
});
