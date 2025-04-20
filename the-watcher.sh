#!/usr/bin/env bash

sudo touch /var/log/suricata/eve.json

sudo suricata -s /home/linux/Documents/the-watcher/emerging-all.rules -i $(ip route show default | awk '/default/ { print $5 }') &
