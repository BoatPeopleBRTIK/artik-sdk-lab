require('dotenv').config();
const artik = require('artik-sdk');

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

var switchState = 0;
var button  = new artik.gpio(actions_button, 'in', 'rising', switchState);

button.on('changed', function (value) {
	switchState ^= 1;
 
	console.log("button state: " + switchState);
	
	var message = JSON.stringify({
		"state": switchState
	});
	
	cloud.send_message(device_id, message, function(response) {
		console.log("Send message - response: " + response);
	});
});

button.request();
	 
process.on('SIGINT', function () {
	console.log('exiting');
	button.release();
	
	process.exit(0);
});