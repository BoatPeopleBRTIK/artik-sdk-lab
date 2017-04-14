require('dotenv').config();
var artik = require('artik-sdk');
var Gpio = require('onoff').Gpio;

var device_id = process.env.SWITCH_DEVICE_ID;
var auth_token = process.env.SWITCH_DEVICE_TOKEN;

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}
var cloud = new artik.cloud(auth_token);

var actions_button;
const name = artik.get_platform_name();
console.log('Running on ' + name);
if (name == 'Artik 710') {
	actions_button = 30;
}

var button  = new Gpio(actions_button, 'in', 'both');

button.watch( function (err, value) {
	if (err) {
		throw err;
	}
 
	console.log("button value: " + value);
	
	var message = JSON.stringify({
		"state": value
	});
	
	cloud.send_message(device_id, message, function(response) {
		console.log("Send message - response: " + response);
	});
});
	 
process.on('SIGINT', function () {
  button.unexport();
});