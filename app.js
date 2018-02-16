const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
      console.log(errorMessage);
    }else{
      //make request to forecast.io with long/lat value
      console.log(results.address);
      //lat, long, callback(errorMessage, results);
      weather.getWeather(results.lattitude, results.longitude, (errorMessage, weatherResults) => {
        if(errorMessage){
          console.log(errorMessage);
        }else{
          console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.` );
        }
      });
    }

  });


//make request to forecast api, pring body.currently; no, print temp
