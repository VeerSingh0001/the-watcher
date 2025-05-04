import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
];

const COLORS = [
  "#oklch(13% 0.028 261.692)",
  "oklch(21% 0.034 264.665)",
  "oklch(27.8% 0.033 256.848)",
  "oklch(37.3% 0.034 259.733)",
  "oklch(44.6% 0.03 256.802)",
  "oklch(55.1% 0.027 264.364)",
];

const PieChartComponent = () => (
  <div className="w-fit text-center">
    <h2>My Pie Chart</h2>
    <PieChart width={160} height={160}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
);

export default PieChartComponent;
