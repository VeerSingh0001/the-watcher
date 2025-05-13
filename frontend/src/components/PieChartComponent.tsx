import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const data = [
//   { name: "Group A", value: 14 },
//   { name: "Group B", value: 3 },
//   { name: "Group D", value: 31 },
//   { name: "Group C", value: 17 },
//   { name: "Group D", value: 14 },
//   { name: "Group D", value: 10 },
// ];

// const COLORS = [
//   "#00d1dc", // midnight blue
//   "#ffc32e", // dark cyan
//   "#ff9e33", // deep purple
//   "#ff4454", // indigo
//   "#006da0", // rich magenta
//   "#00bfe6", // dark violet
// ];

interface Props {
  title: string;
  data: { name: string; value: number }[];
  colors: string[];
}

const PieChartComponent = (props: Readonly<Props>) => (
  <div className="w-fit text-center">
    <h2>{props.title}</h2>
    <PieChart width={200} height={200}>
      <Pie
        data={props.data}
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
        dataKey="value"
      >
        {props.data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={props.colors[index % props.colors.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default PieChartComponent;
