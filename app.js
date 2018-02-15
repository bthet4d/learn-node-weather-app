const request = require('request');
const yargs = require('yargs');
var darkskyKey = '6e2e9f18d46bd479fdb239e0adc9a4c9';
const geocode = require('./geocode/geocode');

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
//
  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
      console.log(errorMessage);
    }else{
      //make request to forecast.io with long/lat values
      request({
        url: `https://api.darksky.net/forecast/${darkskyKey}/${results.lattitude},${results.longitude}`,
        json: true
      }, (error, response, body) => {
          if(!error && response.statusCode === 200){
            console.log(body.currently.temperature);
          }else{
            console.log('Unable to fetch weather.');
          }
      });
    }

  });



//make request to forecast api, pring body.currently; no, print temp
