/*
 * Copyright (C) 2017 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
            "motor_state": {
                "temp": temperature
            }
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