"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Product = {
  id?: number;
  name: string;
  price: number;
};

export default function ProductChart({
  products,
}: {
  products: Product[];
}) {
  
  if (!products || products.length === 0) {
    return <p>No products to visualize</p>;
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3 style={{ marginBottom: "1rem" }}>
        Product Price Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
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