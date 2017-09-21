#include <stdio.h>

#include "common/platform.h"
#include "common/cs_file.h"
#include "mgos_app.h"
#include "fw/src/mgos_gpio.h"
#include "fw/src/mgos_hal.h"
#include "fw/src/mgos_mongoose.h"
#include "fw/src/mgos_sys_config.h"
#include "fw/src/mgos_timers.h"
#include "fw/src/mgos_dlsym.h"

#include "mgos_rcswitch.h"

char* cfg_get_group() {
  printf("group = %s\n", get_cfg()->box433.group);
  return get_cfg()->box433.group;
}

enum mgos_app_init_result mgos_app_init(void) {
  printf(cfg_get_group());

  return MGOS_APP_INIT_SUCCESS;
}
