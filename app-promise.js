const axios = require('axios');
const yargs = require('yargs');
const darkskyKey = '6e2e9f18d46bd479fdb239e0adc9a4c9';
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address)
var geocodeUrl = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {


  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address')
  }
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${long}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature  = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently: ${temperature}. It feels like: ${apparentTemperature}`);
}).catch((e) => {
  if(e.code == 'ENOTFOUND' || e.code == 'ECONNREFUSED'){
    console.log('Unable to connect to API servers.');
  }else{
    console.log(e.message);
  }
});


//make request to forecast api, pring body.currently; no, print temp
