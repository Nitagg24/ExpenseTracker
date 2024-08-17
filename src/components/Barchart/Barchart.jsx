import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { context } from "../Main/Main";

export default function Barchart() {
  const { catPrice } = useContext(context);

  return (
    <BarChart
      width={417}
      height={250}
      data={catPrice}
      layout="vertical"
      barSize={20}
      margin={{ left: 20}}
    >
      <XAxis
        type="number"
        axisLine={false}
        display="none"
        padding={{ left: 5, right: 5 }}
      />
      <YAxis type="category" width={100} dataKey="name" axisLine={false} />
      <Bar dataKey="amt" fill="#8884d8" />
    </BarChart>
  );
}
