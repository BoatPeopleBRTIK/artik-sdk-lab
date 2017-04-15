require('dotenv').config();
const artik = require('artik-sdk');
var sleep = require('sleep');

var device_id = process.env.LED_DEVICE_ID;
var auth_token = process.env.LED_DEVICE_TOKEN;

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}

var actions_led;
const name = artik.get_platform_name();
console.log('Running on ' + name);
if (name == 'Artik 710') {
	actions_led = 28;
}

var led  = new artik.gpio(actions_led, 'led', 'out', 'none', 0);

var ledState = 1;
function toggleLED () {
	led.request();
	led.write(ledState);
	led.release();
	
	console.log('setLED( ' + actions_led + ') value: ' + ledState);
	ledState ^= 1;
}


while(1) {
	toggleLED();
	sleep.sleep(2);
}

process.on('SIGINT', function () {
	console.log('exiting');
	process.exit(0);
});