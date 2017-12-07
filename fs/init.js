load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');

// pin IDs are stored as tags on the peripheral sensors
let wbPin = 14;
let wsPin = 12;
let mbPin = 4;
let msPin = 5;
let topic = '/losant/' + Cfg.get('mqtt.client_id') + '/command';

GPIO.set_mode(wbPin, GPIO.MODE_OUTPUT);
GPIO.set_mode(wsPin, GPIO.MODE_OUTPUT);
GPIO.set_mode(mbPin, GPIO.MODE_OUTPUT);
GPIO.set_mode(msPin, GPIO.MODE_OUTPUT);

// subscribe to the device commands
MQTT.sub(topic, function(conn, topic, msg) {
  let json = JSON.parse(msg);
  if (json.name === 'ledOn' && json.payload && json.payload.pin) {
    GPIO.write(json.payload.pin, 1);
  }
  if (json.name === 'ledOff' && json.payload && json.payload.pin) {
    GPIO.write(json.payload.pin, 0);
  }
}, null);
