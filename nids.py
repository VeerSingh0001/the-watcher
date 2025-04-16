import threading

import netifaces
from scapy.all import sniff

# Global list to store packet logs
packet_logs = []
log_lock = threading.Lock()


def packet_callback(packet):
    summary = packet.summary()
    with log_lock:
        packet_logs.append(summary)
    print(summary)


def get_default_interface():
    gateways = netifaces.gateways()
    default_gateway = gateways.get('default')
    if default_gateway and netifaces.AF_INET in default_gateway:
        return default_gateway[netifaces.AF_INET][1]
    return None


def start_sniffing(interface=None):
    if interface is None:
        interface = get_default_interface()
    if interface is None:
        print("No default interface found!")
        return
    print(f"Starting packet capture on interface: {interface}")
    sniff(iface=interface, prn=packet_callback, store=False)


def get_logs():
    with log_lock:
        return list(packet_logs)


def clear_logs():
    with log_lock:
        packet_logs.clear()
