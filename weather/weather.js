const request = require('request');
const darkskyKey = '6e2e9f18d46bd479fdb239e0adc9a4c9';

let getWeather = (lat, long, callback) => {  
  request({
    url: `https://api.darksky.net/forecast/${darkskyKey}/${lat},${long}`,
    json: true
    }, (error, response, body) => {
      if(!error && response.statusCode === 200){
        callback(undefined, body.currently);
      }else{
        callback('Unable to fetch weather.');
      }
  });
}


module.exports = {
  getWeather
}
