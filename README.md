# 🛡️ The Watcher - Intrusion Detection System (IDS)

![License](https://img.shields.io/github/license/VeerSingh0001/the-watcher)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)
![Flask](https://img.shields.io/badge/Framework-Flask-yellow)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

> A lightweight, open-source Intrusion Detection System (IDS) built with Python, Flask, and SQLite to detect and log suspicious activities in real time.

---

## 📌 Features

- 🔍 **Packet Sniffing** using Scapy  
- 🧠 **Suspicious Activity Detection** (e.g., SYN floods, port scans, etc.)  
- 📝 **Logging** of detected threats in a local SQLite database  
- 🌐 **Web Interface** built with Flask to monitor logs and alerts  
- 📊 **Real-Time Dashboard** with clean UI to manage events  
- 🧪 Easy to test, modify, and expand for custom rules


## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS (Jinja2 templates)
- **Database:** SQLite
- **Packet Capture:** Scapy

---

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

- Python 3.8 or higher
- `pip` for Python package management

### 📥 Installation

```bash
git clone https://github.com/VeerSingh0001/the-watcher.git
cd the-watcher
pip install -r requirements.txt
sudo ./install.sh
./the-watcher

