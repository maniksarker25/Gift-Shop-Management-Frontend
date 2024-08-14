import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useGetManagerLineChartDataQuery } from "../../../redux/features/meta/metaApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";
type TSelectedValue = "monthly" | "yearly";
const ManagerLineChart = () => {
  const [selectedValue, setSelectedValue] = useState<TSelectedValue>("yearly");
  const { data } = useGetManagerLineChartDataQuery(selectedValue);
  const handleSelectChange = (value: TSelectedValue) => {
    setSelectedValue(value);
  };
  return (
    <div className="lg:w-1/2 -ml-14">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl ml-12">Sales Overview</h2>
        <Select
          style={{ width: 200 }}
          placeholder="Filter Overview"
          onChange={handleSelectChange}
          value={selectedValue}
          allowClear={true}
        >
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data?.data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      ;
    </div>
  );
};

export default ManagerLineChart;
