import json
import subprocess
import time


def run_suricata_live():
    # Start the process and get a handle to it
    suricata_proc = subprocess.Popen(
        ['sudo', './the-watcher.sh'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    # Optionally, you can read output in this thread:
    stdout, stderr = suricata_proc.communicate()
    if suricata_proc.returncode != 0:
        print("Error:", stderr)
    else:
        print(stdout)


def stop_suricata_live():
    suricata_proc = subprocess.Popen(
        ['sudo', './stop-watcher.sh'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    # Optionally, you can read output in this thread:
    stdout, stderr = suricata_proc.communicate()
    if suricata_proc.returncode != 0:
        print("Error:", stderr)
    else:
        print(stdout)


def tail_alerts(log_file="/var/log/suricata/eve.json"):
    with open(log_file, "r") as f:
        # f.seek(0,2)
        while True:
            line = f.readline()
            if not line:
                time.sleep(1)
                continue
            try:
                alert = json.loads(line)
                if alert.get("event_type") == "alert":
                    print("Live Suricata Alert:", alert)
            except json.JSONDecodeError:
                continue

# threading.Thread(target=run_suricata_live, daemon=True).start()
#
# threading.Thread(target=tail_alerts, daemon=True).start()
