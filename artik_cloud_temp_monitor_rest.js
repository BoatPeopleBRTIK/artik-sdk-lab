require('dotenv').config();
const artik = require('artik-sdk');
var module_sensor = artik.sensor();

var device_id = process.env.TEMP_SENSOR_DEVICE_ID;
var auth_token = process.env.TEMP_SENSOR_DEVICE_TOKEN;

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}
var cloud = new artik.cloud(auth_token);

try {
    var temp_sensor = module_sensor.get_temperature_sensor(0);
} catch (err) {
    console.log("Error retrieving temperature sensor : " + err)
}

// Get the temperature and send every 10 seconds
setInterval(function() { 
    if (temp_sensor) {
    	var temperature = temp_sensor.get_fahrenheit();
        console.log("Function 'get_fahrenheit' : " + temperature + " F");
    	var message = JSON.stringify({
    		"temp": temperature
    	});
    	
    	cloud.send_message(device_id, message, function(response) {
    		console.log("Send message - response: " + response);
    	});
    }	
	
}, 10000);
	 
process.on('SIGINT', function () {
	console.log('exiting');
	
	process.exit(0);
});