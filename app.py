from flask import Flask, render_template, jsonify
import threading
from nids import start_sniffing, get_logs, clear_logs

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start', methods=['POST'])
def start():
    # Automatically detect default interface and start sniffing
    thread = threading.Thread(target=start_sniffing)
    thread.daemon = True
    thread.start()
    return jsonify({'status': 'started'})

@app.route('/logs', methods=['GET'])
def logs():
    logs = get_logs()
    return jsonify({'logs': logs})

@app.route('/clear_logs', methods=['POST'])
def clear():
    clear_logs()
    return jsonify({'status': 'cleared'})

if __name__ == '__main__':
    # Run with elevated privileges so Scapy can open raw sockets.
    app.run(host='0.0.0.0', port=5000, debug=True)
