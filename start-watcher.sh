#!/usr/bin/env bash

sudo suricata -i $(ip route show default | awk '/default/ { print $5 }') &
