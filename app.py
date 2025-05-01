import atexit
import signal
import sys
import threading

import netifaces
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
from scapy.all import sniff

from ids import run_suricata_live, stop_suricata_live, tail_alerts
from databse import  DATABASE

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
socketio = SocketIO(app, cors_allowed_origins='*')


def get_default_interface():
    # Get default network interface
    gateways = netifaces.gateways()
    default_gateway = gateways.get('default')
    if default_gateway and netifaces.AF_INET in default_gateway:
        return default_gateway[netifaces.AF_INET][1]
    return None


def handle_received_packet(packet):
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
    # Render the main page
    return render_template('index.html')

@app.route("/dashboard", methods=["GET"])
def get_dash():
    db = DATABASE()
    logs = db.get_dashboard_data()
    return jsonify({"status": "success", "Counts": logs}), 200

@socketio.on('connect')
def handle_connect():
    # Handle WebSocket connection
    print('[INFO] Client connected')
    sniff_thread = threading.Thread(target=start_sniffing, daemon=True)
    sniff_thread.start()
    run_ids = threading.Thread(target=run_suricata_live, daemon=True)
    run_ids.start()
    tail_alert = threading.Thread(target=tail_alerts, daemon=True)
    tail_alert.start()


# Function to print something on exit
def on_exit():
    print("Flask app is closing...")
    stop_suricata_live()
    # db.conn.close()
    # db.cursor.close()


# Register the exit function using at exit.
atexit.register(on_exit)


# Alternatively, handle termination signals:
def signal_handler(sig, frame):
    print("Signal received, closing Flask app...")
    stop_suricata_live()
    # db.conn.close()
    # db.cursor.close()
    sys.exit(0)  # Exiting will trigger the at exit functions


# Register the signal handlers for SIGINT and SIGTERM.
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

if __name__ == '__main__':
    # Run Flask app
    # db = DATABASE()
    # db.create_conn()
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
