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
const settings = require('./settings')

var device_id = process.env.LED_DEVICE_ID;
var auth_token = process.env.LED_DEVICE_TOKEN;

if (!device_id || !auth_token) {
    console.log("Either Device ID or Token not found in ENV");
    process.exit(-1);
}

var actions_led = settings.led;
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