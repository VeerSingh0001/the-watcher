import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Group A", value: 14 },
  { name: "Group B", value: 3 },
  { name: "Group D", value: 31 },
  { name: "Group C", value: 17 },
  { name: "Group D", value: 14 },
  { name: "Group D", value: 10 },
];

const COLORS = [
  "#00d1dc", // midnight blue
  "#ffc32e", // dark cyan
  "#ff9e33", // deep purple
  "#ff4454", // indigo
  "#006da0", // rich magenta
  "#00bfe6", // dark violet
];

const PieChartComponent = () => (
  <div className="w-fit text-center">
    <h2>My Pie Chart</h2>
    <PieChart width={300} height={350}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default PieChartComponent;
