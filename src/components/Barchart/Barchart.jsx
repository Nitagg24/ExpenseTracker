import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { context } from "../Main/Main";

export default function Barchart() {
  const { catPrice } = useContext(context);

  return (
    <BarChart
      width={450}
      height={300}
      data={catPrice}
      layout="vertical"
      margin={{
        top: 0,
        right: 20,
        left: 20,
        bottom: 0,
      }}
      barSize={20}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis
        type="number"
        axisLine={false}
        tickLine={false}
        hide
      />
      <YAxis 
        type="category" 
        dataKey="name" 
        axisLine={false} 
        tickLine={false} 
        width={100}
      />
      <Tooltip cursor={{ fill: 'transparent' }} />
      <Bar dataKey="amt" fill="#8884d8" radius={[10, 10, 10, 10]} />
    </BarChart>
  );
}
