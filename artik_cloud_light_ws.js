var artik = require('artik-sdk');
var auth_token = '';
var device_id = '';
var use_se = true;
var actions_led = process.env.ACTIONS_LED;

var Gpio, led;
if (actions_led) {
    Gpio       = require('onoff').Gpio,
    led        = new Gpio(actions_led, 'out');
}

device_id = process.env.DEVICE_ID;
auth_token = process.env.AUTH_TOKEN;

var conn = new artik.cloud(auth_token);

console.log("Launch websocket client after SDR registration.")

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}

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

console.log("Starting secure websocket connection");
conn.websocket_open_stream(auth_token, device_id, use_se);

function setLED (value) {
    if (actions_led) {
        led.writeSync( (value?1:0) , function(error) {
            if(error) throw error;
            console.log('setLED: wrote ' + value );
        });
    }
}

