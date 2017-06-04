#!/bin/bash
set -e
mos build
mos flash
mos wifi $MGOS_WIFI_SSID $MGOS_WIFI_SECRET
mos config-set blynk.auth=$MGOS_BLYNK_AUTH wifi.ap.enable=true wifi.ap.ssid=box433 wifi.ap.pass=$MGOS_AP_SECRET
mos console
