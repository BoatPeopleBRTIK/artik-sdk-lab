require('dotenv').config();
const artik = require('artik-sdk');

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

console.log("Launching websocket client.")
var conn = new artik.cloud(auth_token);

conn.on('receive', function(message) {
    var msg = JSON.parse(message);
    console.log("Message from cloud " + message);
    if (msg.type == 'action') {
        if (msg.data.actions[0].name == 'setOn') {
            console.log('Received Action setOn');
            setLED(1);
            conn.websocket_send_message("{\"state\":true}");
        }
        if (msg.data.actions[0].name == 'setOff') {
            console.log('Received Action setOff');
            setLED(0);
            conn.websocket_send_message("{\"state\":false}");
        }
    }
});

console.log("Starting websocket connection");
conn.websocket_open_stream(auth_token, device_id, false);

function setLED (value) {
	led.request();
	led.write(value);
	led.release();
	
	console.log('setLED( ' + actions_led + ') value: ' + value);
}

process.on('SIGINT', function () {
	console.log('exiting');
	process.exit(0);
});