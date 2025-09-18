
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

// Võta ainult need kirjed, mis on praegusest ajast edasi
const now = new Date();
const timeseriesFuture = timeseries.filter(item => new Date(item.time) >= now);

// Näita järgmised 24 tundi
const hoursToShow = 24;
for (let i = 0; i < Math.min(hoursToShow, timeseriesFuture.length); i++) {
    const item = timeseriesFuture[i];
    const time = item.time;

    // Kontrollime, kas next_1_hours olemas, muidu paneme '-'
    const symbol = item.data.next_1_hours
        ? item.data.next_1_hours.summary.symbol_code
        : "-";
    
    console.log(`${time} ${symbol}`);
}

})
.catch(error => {
  console.error("Viga päringus:", error.message);
});
