require('dotenv').config();
var artik = require('artik-sdk');
var gpio = require('artik-sdk').gpio;
var Gpio = require('onoff').Gpio;

var auth_token = process.env.AUTH_TOKEN;
var device_id = process.env.DEVICE_ID;
var actions_led = process.env.ACTIONS_LED;
if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}

var led;

const name = artik.get_platform_name();
console.log('Running on ' + name);
if (name == 'Artik 710') {
	led = new Gpio(actions_led, 'out');
}

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
    if (actions_led) {
        led.writeSync( (value?1:0) , function(error) {
            if(error) throw error;
            console.log('setLED: wrote ' + value );
        });
    }
}

