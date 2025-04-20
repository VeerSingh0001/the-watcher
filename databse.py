import json
import sqlite3


class DATABASE:

    def __init__(self):
        self.conn = sqlite3.connect("alerts_db.db")
        self.cursor = self.conn.cursor()

    def create_conn(self):
        self.cursor.execute("""
			CREATE TABLE IF NOT EXISTS alerts (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				alert_data TEXT NOT NULL
			)
		""")

        self.conn.commit()

    def insert_alert(self, alert):
        alert_json = json.dumps(alert)

        self.cursor.execute("INSERT INTO alerts (alert_data) VALUES (?)", (alert_json,))

        self.conn.commit()

    def get_alerts(self):
        # Retrieve all alerts from the database.
        self.cursor.execute("SELECT id, alert_data FROM alerts")
        rows = self.cursor.fetchall()

        for row in rows:
            alert_id = row[0]
            alert_data_str = row[1]
            # Convert the JSON text back to a Python dictionary.
            alert_data = json.loads(alert_data_str)
            print(f"Alert ID: {alert_id}")
            print("Alert Data:", alert_data, type(alert_data))


