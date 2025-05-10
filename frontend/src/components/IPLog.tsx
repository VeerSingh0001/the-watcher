import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type IPLogProps = {
  data: number[]; // Raw numerical values, such as IP access counts or response times
  binSize?: number; // Size of each bin
};

const generateHistogramData = (data: number[], binSize: number) => {
  if (!data.length) return [];

  const min = Math.min(...data);
  const max = Math.max(...data);
  const bins: { name: string; count: number }[] = [];

  const binStart = Math.floor(min / binSize) * binSize;
  const binEnd = Math.ceil(max / binSize) * binSize;

  for (let start = binStart; start < binEnd; start += binSize) {
    const end = start + binSize;
    const count = data.filter((val) => val >= start && val < end).length;
    bins.push({ name: `${start}-${end}`, count });
  }

  return bins;
};

const IPLog: React.FC<IPLogProps> = ({ data, binSize = 10 }) => {
  const histogramData = generateHistogramData(data, binSize);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={histogramData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3490dc" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IPLog;
