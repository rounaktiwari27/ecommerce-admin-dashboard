"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProductChart({ products }: { products: any[] }) {
  return (
  <div style={{ width: "100%", height: 320 }}>
    <h3 style={{ marginBottom: "1rem" }}>
      Product Price Distribution
    </h3>

    <ResponsiveContainer>
      <BarChart data={products}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="price" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
}