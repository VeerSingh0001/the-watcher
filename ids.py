from idstools import rule
import os

RULES_FILE = "/home/linux/Documents/the-watcher/rules.rules"

def process_packet_with_rules(packet_info):
    """
    Process a packet using idstools and match it against the rules.
    """
    try:
        # Load rules
        rules = rule.parse_file(RULES_FILE)
        for r in rules:
            # Example matching logic (customize as needed)
            if r.proto == packet_info.get("protocol") and \
               r.src_port == str(packet_info.get("src_port")) and \
               r.dst_port == str(packet_info.get("dest_port")):
                print(f"Anomaly detected: {r.msg}")
                return True  # Anomaly detected
        return False  # No anomaly detected
    except Exception as e:
        print(f"[ERROR] Failed to process packet with rules: {e}")
        return False
