import os
import threading

import netifaces
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_socketio import SocketIO
from scapy.all import sniff

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
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


@socketio.on('connect')
def handle_connect():
    # Handle WebSocket connection
    print('[INFO] Client connected')
    sniff_thread = threading.Thread(target=start_sniffing, daemon=True)
    sniff_thread.start()


if __name__ == '__main__':
    # Run Flask app

    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
