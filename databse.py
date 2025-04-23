import json
import sqlite3


class DATABASE:

    def __init__(self):
        self.conn = sqlite3.connect("alerts_db.db")
        self.cursor = self.conn.cursor()
        self.create_conn()

    def create_conn(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Top-level properties
    "timestamp" TIMESTAMPTZ,
    flow_id BIGINT,
    in_iface TEXT,
    event_type TEXT,
    src_ip TEXT,
    src_port INTEGER,
    dest_ip TEXT,
    dest_port INTEGER,
    proto TEXT,
    pkt_src TEXT,
    
    -- Flattened "alert" object properties
    alert_action TEXT,
    alert_gid INTEGER,
    alert_signature_id INTEGER,
    alert_rev INTEGER,
    alert_signature TEXT,
    alert_category TEXT,
    alert_severity INTEGER,
    -- For metadata arrays, you might store as TEXT (JSON string) or ARRAY; here we store as TEXT.
    metadata_affected_product TEXT,
    metadata_attack_target TEXT,
    metadata_confidence TEXT,
    metadata_created_at TEXT,
    metadata_deployment TEXT,
    metadata_performance_impact TEXT,
    metadata_signature_severity TEXT,
    metadata_updated_at TEXT,
    
    -- Other top-level properties
    app_proto TEXT,
    direction TEXT,
    
    -- Flattened "flow" object properties
    flow_pkts_toserver INTEGER,
    flow_pkts_toclient INTEGER,
    flow_bytes_toserver INTEGER,
    flow_bytes_toclient INTEGER,
    flow_start TIMESTAMPTZ,
    flow_src_ip TEXT,
    flow_dest_ip TEXT,
    flow_src_port INTEGER,
    flow_dest_port INTEGER
);
""")

        self.conn.commit()

    def insert_alert(self, alert):
        timestamp = alert["timestamp"]
        flow_id = alert["flow_id"]
        in_iface = alert["in_iface"]
        event_type = alert["event_type"]
        src_ip = alert["src_ip"]
        src_port = alert["src_port"]
        dest_ip = alert["dest_ip"]
        dest_port = alert["dest_port"]
        proto = alert["proto"]
        pkt_src = alert["pkt_src"]

        # Flattened alert properties
        alert_action = alert["alert"]["action"]
        alert_gid = alert["alert"]["gid"]
        alert_signature_id = alert["alert"]["signature_id"]
        alert_rev = alert["alert"]["rev"]
        alert_signature = alert["alert"]["signature"]
        alert_category = alert["alert"]["category"]
        alert_severity = alert["alert"]["severity"]

        # For metadata arrays, we store them as JSON strings
        metadata_affected_product = json.dumps(alert["alert"]["metadata"]["affected_product"])
        metadata_attack_target = json.dumps(alert["alert"]["metadata"]["attack_target"])
        metadata_confidence = json.dumps(alert["alert"]["metadata"]["confidence"])
        metadata_created_at = json.dumps(alert["alert"]["metadata"]["created_at"])
        metadata_deployment = json.dumps(alert["alert"]["metadata"]["deployment"])
        metadata_performance_impact = json.dumps(alert["alert"]["metadata"]["performance_impact"])
        metadata_signature_severity = json.dumps(alert["alert"]["metadata"]["signature_severity"])
        metadata_updated_at = json.dumps(alert["alert"]["metadata"]["updated_at"])

        # Other top-level properties
        app_proto = alert["app_proto"]
        direction = alert["direction"]

        # Flattened flow properties
        flow_pkts_toserver = alert["flow"]["pkts_toserver"]
        flow_pkts_toclient = alert["flow"]["pkts_toclient"]
        flow_bytes_toserver = alert["flow"]["bytes_toserver"]
        flow_bytes_toclient = alert["flow"]["bytes_toclient"]
        flow_start = alert["flow"]["start"]
        flow_src_ip = alert["flow"]["src_ip"]
        flow_dest_ip = alert["flow"]["dest_ip"]
        flow_src_port = alert["flow"]["src_port"]
        flow_dest_port = alert["flow"]["dest_port"]

        insert_query = """
        INSERT INTO alerts (
            "timestamp",
            flow_id,
            in_iface,
            event_type,
            src_ip,
            src_port,
            dest_ip,
            dest_port,
            proto,
            pkt_src,
            alert_action,
            alert_gid,
            alert_signature_id,
            alert_rev,
            alert_signature,
            alert_category,
            alert_severity,
            metadata_affected_product,
            metadata_attack_target,
            metadata_confidence,
            metadata_created_at,
            metadata_deployment,
            metadata_performance_impact,
            metadata_signature_severity,
            metadata_updated_at,
            app_proto,
            direction,
            flow_pkts_toserver,
            flow_pkts_toclient,
            flow_bytes_toserver,
            flow_bytes_toclient,
            flow_start,
            flow_src_ip,
            flow_dest_ip,
            flow_src_port,
            flow_dest_port
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?
        );
        """

        # Build the parameters tuple in proper order
        params = (
            timestamp,
            flow_id,
            in_iface,
            event_type,
            src_ip,
            src_port,
            dest_ip,
            dest_port,
            proto,
            pkt_src,
            alert_action,
            alert_gid,
            alert_signature_id,
            alert_rev,
            alert_signature,
            alert_category,
            alert_severity,
            metadata_affected_product,
            metadata_attack_target,
            metadata_confidence,
            metadata_created_at,
            metadata_deployment,
            metadata_performance_impact,
            metadata_signature_severity,
            metadata_updated_at,
            app_proto,
            direction,
            flow_pkts_toserver,
            flow_pkts_toclient,
            flow_bytes_toserver,
            flow_bytes_toclient,
            flow_start,
            flow_src_ip,
            flow_dest_ip,
            flow_src_port,
            flow_dest_port
        )

        self.cursor.execute(insert_query, params)

        self.conn.commit()

    def get_alerts(self):
        # Retrieve all alerts from the database.
        self.cursor.execute("SELECT * FROM alerts ORDER BY id DESC LIMIT 1;")
        rows = self.cursor.fetchone()
        print(rows)
        self.conn.close()
        # column_names = [desc[0] for desc in self.cursor.description]
        # for row in rows:
        #     for col_name, value in zip(column_names, row):
        #         print(f"{col_name}: {value}")
        #     print("-" *40)  # Separator between rows
