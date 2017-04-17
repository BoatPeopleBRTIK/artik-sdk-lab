# ARTIK SDK Labs

The labs in this repository show how to build applications on ARTIK modules using the node.js [artik-sdk](https://developer.artik.io/documentation/api/index.html). 

## Demo

- Run the Android app. 
- Click Login button.
- Sign in or sign up on the following screen:

![GitHub Logo](./img/screenshot-signin-signup.png)

- Receive the access token after login succeeds:

![GitHub Logo](./img/screenshot-receive-accesstoken.png)

## Prerequisites
* ARTIK Module (530 or 710)
* ARTIK SDK. Follow [these instructions](https://developer.artik.io/documentation/api/index.html)
* [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
* git

## Setup / Installation:

- Clone this git repository in your module.
- Run `npm install` to install the dependencies - artik-sdk

### Set up at ARTIK Cloud

Follow [these instructions](https://developer.artik.cloud/documentation/tools/web-tools.html#create-an-artik-cloud-account) to sign up and create an account on ARTIK Cloud, if you haven't already created one on artik.io.



Make a note of the device ID and device token for each device you registered.

### Set up your .env file

- Fill the `ID`s and `TOKEN`s in the .env file with your own device IDs and device Tokens:
~~~bash
LED_DEVICE_ID=
LED_DEVICE_TOKEN=
SWITCH_DEVICE_ID=
SWITCH_DEVICE_TOKEN=
TEMP_SENSOR_DEVICE_ID=
TEMP_SENSOR_DEVICE_TOKEN=
~~~

- Save the file.

## More examples


More about ARTIK Cloud
---------------

If you are not familiar with ARTIK Cloud, we have extensive documentation at https://developer.artik.cloud/documentation

The full ARTIK Cloud API specification can be found at https://developer.artik.cloud/documentation/api-reference/

Peek into advanced sample applications at https://developer.artik.cloud/documentation/samples/

To create and manage your services and devices on ARTIK Cloud, visit the Developer Dashboard at https://developer.artik.cloud

License and Copyright
---------------------

Licensed under the Apache License. See [LICENSE](LICENSE).

Copyright (c) 2017 Samsung Electronics Co., Ltd.
