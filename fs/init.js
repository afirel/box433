load('api_timer.js');
load('api_rcswitch.js');
load('api_blynk.js');

let control_switch = function(device, state) {
  let group = ffi('char* cfg_get_group(void)')();
  print("GROUP", group);
  if (state === 1) {
    RCSwitch.switchOn(group, device);
  } else {
    RCSwitch.switchOff(group, device);
  }
};

Blynk.setHandler(function(conn, cmd, pin, val) {
  print(cmd, pin, val);
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
  }
}, null);
