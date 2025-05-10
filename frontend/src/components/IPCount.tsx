import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import { useData } from "../contexts/DataContext";

type IPCountProps = {
  ips: string[];
};

// type TreemapDataItem = {
//   name: string;
//   size: number;
//   fill: string;
// };

const COLORS = [
  "oklch(63.7% 0.237 25.331)",
  "oklch(70.5% 0.213 47.604)",
  "oklch(76.9% 0.188 70.08)",
  "oklch(79.5% 0.184 86.047)",
  "oklch(76.8% 0.233 130.85)",
  "oklch(72.3% 0.219 149.579)",
  "oklch(69.6% 0.17 162.48)",
  "oklch(70.4% 0.14 182.503)",
  "oklch(71.5% 0.143 215.221)",
  "oklch(68.5% 0.169 237.323)",
  "oklch(54.6% 0.245 262.881)",
  "oklch(45.7% 0.24 277.023)",
  "oklch(60.6% 0.25 292.717)",
];

const IPCount: React.FC<IPCountProps> = () => {
  const { ipCounts } = useData();
  const countMap: any = ipCounts;

  const data: any[] = Object.entries(countMap).map(([ip, count], index) => ({
    name: ip,
    size: count,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        backgroundColor: "oklch(27.8% 0.033 256.848)",
      }}
    >
      <h2 className="text-center">IP Count</h2>
      <ResponsiveContainer>
        <Treemap
          data={data}
          dataKey="size"
          nameKey="name"
          content={<CustomTreemapContent />}
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTreemapContent: React.FC<any> = (props) => {
  const { x, y, width, height, name, fill } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="#fff"
      />
      {width > 60 && height > 20 && (
        <text x={x + 5} y={y + 20} fill="#fff" fontSize={12}>
          {name}
        </text>
      )}
    </g>
  );
};

export default IPCount;
