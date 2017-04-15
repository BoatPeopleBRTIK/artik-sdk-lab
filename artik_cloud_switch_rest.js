require('dotenv').config();
const artik = require('artik-sdk');

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
var button = new artik.gpio(actions_button, 'button', 'in', 'rising', switchState);
console.log("Button " + button.read());

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