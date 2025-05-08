export default function LogTable() {
  return (
    <div className="w-full text-white">
      <div className="overflow-x-auto m-10 rounded-lg shadow-lg">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
              <thead className="bg-gray-700 sticky top-0 z-10">
                <tr>
                  {[
                    "TimeStamp",
                    "Source",
                    "Destiniation",
                    "Source Port",
                    "Destination Port",
                    "Protocol",
                    // "Severity",
                    // "Direction",

                    // "Bytes to Server",
                    // "Bytes to Client",
                    // "Flow Alert"

                    
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto h-140 ">
              <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
                <tbody className="divide-y divide-gray-700">
                  {Array.from({ length: 30 }, (_, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-4 py-2 whitespace-nowrap">
                        User {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        Role {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        Dept {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-green-400">
                        Active
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        user{index + 1}@email.com
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        +1234567890
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        City {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Row({
  children,
  isTitle,
}: {
  children: React.ReactNode;
  isTitle?: boolean;
}) {
  return <div className={`row ${isTitle ? "title" : ""} flex`}>{children}</div>;
}
