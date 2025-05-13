import { useLogs } from "../contexts/LogContext";

export default function LogTable() {
  const { data: logs, category, loadMore } = useLogs();

  return (
    <div className="mx-auto mt-10">
      <div className="overflow-y-auto max-h-150 shadow-lg rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-900 text-gray-200">
          <thead className="sticky top-0 bg-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Timestamp</th>
              <th className="py-2 px-4 text-left">Source</th>
              <th className="py-2 px-4 text-left">Source Port</th>
              <th className="py-2 px-4 text-left">Destination</th>
              <th className="py-2 px-4 text-left">Destination Port</th>
              <th className="py-2 px-4 text-left">Protocol</th>
              {category === "alerts" && (
                <>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Severity</th>
                </>
              )}
              {category === "flows" && (
                <>
                  <th className="py-2 px-4 text-left">Flow Start</th>
                  <th className="py-2 px-4 text-left">Flow End</th>
                  <th className="py-2 px-4 text-left">Is Safe</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.map((log, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-2 px-4">{log.timestamp}</td>
                  <td className="py-2 px-4">{log.src_ip}</td>
                  <td className="py-2 px-4">{log.src_port || 80}</td>
                  <td className="py-2 px-4">{log.dest_ip}</td>
                  <td className="py-2 px-4">{log.dest_port || 80}</td>
                  <td className="py-2 px-4">{log.proto}</td>
                  {category === "alerts" && (
                    <>
                      <td className="py-2 px-4">{log.alert_category}</td>
                      <td className="py-2 px-4">
                        <SeverityLog value={log.alert_severity} />
                      </td>
                    </>
                  )}
                  {category === "flows" && (
                    <>
                      <td className="py-2 px-4">{log.flow_start}</td>
                      <td className="py-2 px-4">{log.flow_end}</td>
                      <td className="py-2 px-4">
                        {log.flow_alerted === "1" ? "🚨" : "✅"}
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={() => loadMore && loadMore()}
          className="w-full text-center bg-gray-900 cursor-pointer hover:bg-gray-800"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

function SeverityLog({ value }: { value: number }) {
  const color =
    value === 1 ? "bg-green-600" : value === 2 ? "bg-yellow-500" : "bg-red-600";

  return (
    <p className={`${color} text-black font-bold text-center rounded-2xl`}>
      {value}
    </p>
  );
}
