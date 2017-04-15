require('dotenv').config();
const artik = require('artik-sdk');

var device_id = process.env.SWITCH_DEVICE_ID;
var auth_token = process.env.SWITCH_DEVICE_TOKEN;

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}
var cloud = new artik.cloud(auth_token);

var actions_button, actions_led;
const name = artik.get_platform_name();
console.log('Running on ' + name);
if (name == 'Artik 710') {
	actions_button = 30;
	actions_led = 28;
}

var button = new artik.gpio(actions_button, 'button', 'in', 'rising', 0);
var led  = new artik.gpio(actions_led, 'led', 'out', 'none', 0);

var ledState = 1;
function toggleLED () {
	led.request();
	led.write(ledState);
	led.release();
	
	console.log('setLED( ' + actions_led + ') value: ' + value);
	ledState ^= 1;
}

button.on('changed', function (value) {
	switchState ^= 1;
 
	console.log("button state: " + switchState);
});

button.request();
	 
process.on('SIGINT', function () {
	console.log('exiting');
	button.release();
	
	process.exit(0);
});