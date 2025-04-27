#!/usr/bin/env bash

sudo suricata -s "${pwd}/rules/rules.rules" -i $(ip route show default | awk '/default/ { print $5 }') &
