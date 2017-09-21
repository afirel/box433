load('api_timer.js');
load('api_blynk.js');

let RCSwitch = {
  configure: ffi('void rcswitch_configure(int, int, int, int)'),
  switchOn: ffi('void rcswitch_switch_on(char*, char*)'),
  switchOff: ffi('void rcswitch_switch_off(char*, char*)'),

  PIN: 13,
  PROTOCOL: 1,
  PULSE_LENGTH: 300,
  REPEAT_TRANSMIT: 15,
};

RCSwitch.configure(
  RCSwitch.PIN,
  RCSwitch.PROTOCOL,
  RCSwitch.PULSE_LENGTH,
  RCSwitch.REPEAT_TRANSMIT
);

let control_switch = function(device, state) {
  let group = ffi('char* cfg_get_group(void)')();
  if (state === 1) {
    RCSwitch.switchOn(group, device);
  } else {
    RCSwitch.switchOff(group, device);
  }
};

Blynk.setHandler(function(conn, cmd, pin, val, id) {
  print(cmd, pin, val, id);
  if (cmd === 'vw') {
    if (pin === 1) {
      control_switch("10000", val);
    } else if (pin === 2) {
      control_switch("01000", val);
    } else if (pin === 3) {
      control_switch("00100", val);
    } else if (pin === 4) {
      control_switch("00010", val);
    } else if (pin === 5) {
      control_switch("00001", val);
    }
  } else if (cmd === 'vr') {
    let sensor = pin - 10;
    print("Send temp sensor ", sensor, " reading: ", temp_readings[sensor]);
    Blynk.virtualWrite(conn, pin, temp_readings[sensor], id);
  }
}, null);
