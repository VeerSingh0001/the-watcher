#!/usr/bin/env bash

sudo suricata -s /home/linux/Documents/the-watcher/emerging-all.rules -i $(ip route show default | awk '/default/ { print $5 }') &
