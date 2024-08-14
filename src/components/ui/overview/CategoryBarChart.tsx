/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  { _id: "Home decor", count: 9 },
  { _id: "Accessories", count: 1 },
  { _id: "Gadget", count: 6 },
];

const getPath = (x: any, y: any, width: any, height: any) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CategoryBarChart = ({
  categoryBarChartData,
}: {
  categoryBarChartData: any;
}) => {
  return (
    <div className="lg:w-1/2">
      <h2 className="text-xl mb-5 ml-12">Product Category Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={categoryBarChartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Bar
            dataKey="count"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {categoryBarChartData?.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
