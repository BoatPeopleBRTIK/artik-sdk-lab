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

'use strict'
const artik = require('artik-sdk');

const settings = {
	button: getButton(),
	led: getLED()
}

function getButton() {
	switch (artik.get_platform_name()) {
		case 'Artik 710':
			// SW403
			return 30;
		case 'Artik 530':
			return 30;	
		case 'Artik 520':
			return 121;
		case 'Artik 1020':
			return 8;
		default:
			console.log("Invalid Platform name: " + artik.get_platform_name());
	    	process.exit(-1);
	}		
}

function getLED() {
	switch (artik.get_platform_name()) {
		case 'Artik 710':
			return 28;
		case 'Artik 530':
			//
			return 28;
		case 'Artik 520':
			return 135;
		case 'Artik 1020':
			return 22;
		default: 
			console.log("Invalid Platform name: " + artik.get_platform_name());
	    	process.exit(-1);
	}
}

module.exports = settings