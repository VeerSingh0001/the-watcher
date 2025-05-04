import json
import subprocess
import time

from databse import DATABASE


def run_suricata_live():
    # Start the process and get a handle to it
    suricata_proc = subprocess.Popen(
        ['sudo', './start-watcher.sh'],
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
    # db.conn.close()
    # db.cursor.close()
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
        f.seek(0, 2)
        while True:
            line = f.readline()
            if not line:
                time.sleep(1)
                continue
            try:
                log = json.loads(line)
                if log.get("event_type") == "alert":
                    print("Live Suricata Alert:", log)
                    db = DATABASE()
                    db.create_alert_conn()
                    db.insert_alert(log)
                    db.get_alerts()
                if log.get("event_type") == "stats":
                    db = DATABASE()
                    db.create_stat_conn()
                    db.insert_stat(log)
                    # print(log)
                if log.get("event_type") == "flow":
                    db = DATABASE()
                    db.create_flow_conn()
                    db.insert_flow(log)
                    # print(log)
            except json.JSONDecodeError as e:
                print(e)
                continue

# threading.Thread(target=run_suricata_live, daemon=True).start()

# threading.Thread(target=tail_alerts, daemon=True).start()
# tail_alerts()
