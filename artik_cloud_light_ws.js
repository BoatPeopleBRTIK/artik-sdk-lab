require('dotenv').config();
var artik = require('artik-sdk');
var Gpio = require('onoff').Gpio;

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
	//actions_led = artik.artik710.ARTIK_A710_GPIO_GPIO8;

	actions_led = 28;
}

var led  = new Gpio(actions_led, 'out');

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
    led.writeSync( (value) , function(error) {
        if(error) throw error;
        console.log('setLED: wrote ' + value );
    });
}

process.on('SIGINT', function () {
	led.unexport();
});