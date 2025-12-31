import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProductChart from "@/components/ProductChart";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const cookieStore = await cookies(); 
  const admin = cookieStore.get("admin");

  if (!admin || admin.value !== "true") {
    redirect("/login");
  }

  const products = await getProducts();

  const totalProducts = products.length;

  const averagePrice =
    totalProducts === 0
      ? 0
      : (
          products.reduce((sum: number, p: any) => sum + p.price, 0) /
          totalProducts
        ).toFixed(2);

  const highestPrice =
    totalProducts === 0
      ? 0
      : Math.max(...products.map((p: any) => p.price));

  return (
  <div style={{ padding: "1.5rem" }}>
    <h1>Admin Dashboard</h1>

    <div style={{ marginBottom: "1rem" }}>
      <p><strong>Total Products:</strong> {totalProducts}</p>
      <p><strong>Average Price:</strong> ₹{averagePrice}</p>
      <p><strong>Highest Price:</strong> ₹{highestPrice}</p>
    </div>


    <div style={{ marginBottom: "1.5rem" }}>
      <a
        href="/dashboard/products"
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          border: "1px solid #6366f1",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Manage Products →
      </a>
    </div>

    <div
      style={{
        padding: "1rem",
        border: "1px solid #333",
        borderRadius: "8px",
      }}
    >
      <ProductChart products={products} />
    </div>
  </div>
);
}