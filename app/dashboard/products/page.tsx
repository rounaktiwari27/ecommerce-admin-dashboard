import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function Products() {
  
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin");

  if (!adminCookie || adminCookie.value !== "true") {
    redirect("/login");
  }

  
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1>Products</h1>

      <a href="/dashboard/products/new">➕ Add Product</a>

      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "0.75rem",
              }}
            >
              {/* IMAGE */}
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  No Image
                </div>
              )}

              {/* INFO */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{p.name}</p>
                <p style={{ margin: 0 }}>₹{p.price}</p>
              </div>

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <a href={`/dashboard/products/${p.id}/edit`}>Edit</a>
                <DeleteButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}