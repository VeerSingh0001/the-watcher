import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: any;
  color: string;
  title: string;
}

export default function HorBar(props: Readonly<Props>) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2 className="text-center">{props.title}</h2>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={props.data}
          margin={{ top: 0, right: 30, left: 30 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis type="number" />
          <YAxis
            dataKey="category"
            type="category"
            tick={{ fill: "#fff", fontSize: "10" }}
          />
          <Tooltip />
          <Bar dataKey="count" fill={props.color}>
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
