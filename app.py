from flask import Flask, render_template
from dotenv import load_dotenv
from flask_socketio import SocketIO
from scapy.all import sniff
import os
import threading
import netifaces
import json
import logging
from pythonjsonlogger import jsonlogger


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
socketio = SocketIO(app, cors_allowed_origins='*')


# Setup JSON logging
logger = logging.getLogger("IDS-Logger")
logger.setLevel(logging.INFO)

log_handler = logging.FileHandler("network_logs.json")  # Store logs in a file
formatter = jsonlogger.JsonFormatter('%(timestamp)s %(src_ip)s %(dest_ip)s %(src_port)s %(dest_port)s %(protocol)s %(packet_size)s %(tcp_flags)s %(event_type)s')
log_handler.setFormatter(formatter)
logger.addHandler(log_handler)



def get_default_interface():
    # Get default network interface
    gateways = netifaces.gateways()
    default_gateway = gateways.get('default')
    if default_gateway and netifaces.AF_INET in default_gateway:
        return default_gateway[netifaces.AF_INET][1]
    return None

def handle_received_packet(packet):
    # Emit packet summary via WebSocket
    try:
        result = packet.json()
        data = json.loads(result)
        print(data)
        # Use .get() to avoid key errors and fix typos if keys are missing
        payload = data.get("payload", {})
        packet_info = {
            "src_ip": payload.get("src"),
            "src_mac": data.get("src"),
            "src_port": payload.get("payload", {}).get("sport"),
            "dest_ip": payload.get("dst"),
            "dest_mac": data.get("dst"),
            "dest_port": payload.get("payload", {}).get("dport"),
            "protocol": payload.get("proto"),
            "length": payload.get("len"),
            "timestamp": payload.get("Timestamp"),  # Fixed typo from "payoad"
            "tcp_flags": payload.get("flags"),
            "options": payload.get("options"),
            "event_type": data.get("type"),
        }
        logger.info("Captured packet", extra=packet_info)
        # print(packet_info)

    except Exception as e:
        logger.error(f"Error processing packet: {e}")

    socketio.emit('packet:received', packet.summary())

def start_sniffing(interface=None):
    # Start packet sniffing
    if interface is None:
        interface = get_default_interface()
    if not interface:
        print("[ERROR] No default network interface found!")
        return
    print(f"[INFO] Capturing packets on: {interface}")
    sniff(iface=interface, prn=handle_received_packet, store=False)

@app.route('/')
def index():
    # Render main page
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    # Handle WebSocket connection
    print('[INFO] Client connected')
    sniff_thread = threading.Thread(target=start_sniffing, daemon=True)
    sniff_thread.start()

if __name__ == '__main__':
    # Run Flask app
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
