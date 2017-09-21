// Load Mongoose OS API
load('api_arduino_onewire.js');
load('api_arduino_dallas_temp.js');

// GPIO pin which has sensors data wire connected
let pin = 0;

// Initialize 1-Wire bus
let ow = OneWire.create(pin);
// Initialize DallasTemperature library
let dt = DallasTemperature.create(ow);
// Start up the library
dt.begin();
// Number of sensors found on the 1-Wire bus
let n = 0;
// Sensors addresses
let sens = [];

let temp_readings = [];

// This function reads data from the DS sensors every 2 seconds
Timer.set(2000 /* milliseconds */, true /* repeat */, function() {
  if (n === 0) {
    n = dt.getDeviceCount();
    print('Sensors found:', n);

    for (let i = 0; i < n; i++) {
      sens[i] = '01234567';
      if (dt.getAddress(sens[i], i) === 1) {
        print('Sensor#', i, 'address:', dt.toHexStr(sens[i]));
      }
    }
  }

  dt.requestTemperatures();
  for (let i = 0; i < n; i++) {
    let reading = dt.getTempC(sens[i]);
    temp_readings[i] = reading;
    print('Sensor#', i, 'Temperature:', reading, '*C');
  }
}, null);


