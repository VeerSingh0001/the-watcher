#!/usr/bin/env bash


sudo apt install suricata
sudo cp "$(pwd)/rules/emerging-all.rules" /var/lib/suricata/rules/suricata.rules
sudo touch /var/log/suricata/eve.json


echo "$(whoami) ALL=(ALL) NOPASSWD: $(pwd)/the-watcher.sh" | sudo tee /etc/sudoers.d/start-watcher
sudo chmod 0440 /etc/sudoers.d/start-watcher

echo "$(whoami) ALL=(ALL) NOPASSWD: $(pwd)/stop-watcher/" | sudo tee /etc/sudoers.d/stop-watcher
sudo chmod 0440 /etc/sudoers.d/stop-watcher
