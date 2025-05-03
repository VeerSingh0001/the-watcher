import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * A customizable bar chart component using Recharts.
 *
 * Props:
 * - data: Array of objects with keys for `name` and `value` (default sample provided).
 * - width: Chart width in pixels or percentage string (default: '100%').
 * - height: Chart height in pixels (default: 300).
 * - backgroundColor: Background color of the chart container (default: '#ffffff').
 * - barColor: Color of the bars (default: '#8884d8').
 * - title: Main title of the chart (default: '').
 * - subtitle: Subtitle or description under the title (default: '').
 */
const BarChartComponent = ({
  data = [
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
    { name: "A", value: 30 },
    { name: "B", value: 45 },
    { name: "C", value: 20 },
    { name: "D", value: 60 },
  ],
  width = "100%",
  height = 140,
  backgroundColor = "#101828",
  barColor = "#1e2939",
  title = "Title",
  subtitle = "subtitle",
}) => (
  <div style={{ width, backgroundColor, padding: "1rem" }}>
    {title && <h3 style={{ margin: 0, color: "#fff" }}>{title}</h3>}
    {subtitle && (
      <p style={{ margin: "0 0 1rem 0", color: "#aaa" }}>{subtitle}</p>
    )}
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barCategoryGap={0}
          barGap={0}
        >
          <XAxis dataKey="name" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "none" }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#ccc" }}
          />
          <Bar
            dataKey="value"
            fill={barColor}
            onMouseOver={(e) => {
              e.target.style.fill = barColor;
            }}
            onMouseOut={(e) => {
              e.target.style.fill = barColor;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BarChartComponent;
