"use client";

import ProductChart from "./ProductChart";

export default function ProductChartClient({
  products,
}: {
  products: any[];
}) {
  return <ProductChart products={products} />;
}
