"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();

  
  const id = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //LOAD PRODUCT
  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const products = await res.json();

        const product = products.find((p: any) => p.id === id);

        if (!product) {
          router.push("/dashboard/products");
          return;
        }

        setName(product.name);
        setPrice(product.price.toString());
        setImageUrl(product.imageUrl ?? null);
      } catch {
        router.push("/dashboard/products");
      }
    }

    fetchProduct();
  }, [id, router]);

  // IMAGE UPLOAD (OPTIONAL)
  async function uploadImageIfNeeded() {
    if (!newImage) return imageUrl;

    const formData = new FormData();
    formData.append("file", newImage);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.url;
  }

  //UPDATE PRODUCT
  async function handleSubmit() {
    if (!name.trim() || !price) {
      setError("Name and price are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const finalImageUrl = await uploadImageIfNeeded();

      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: name.trim(),
          price: Number(price),
          imageUrl: finalImageUrl ?? undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }

      router.push("/dashboard/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Edit Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </div>

      {/* CURRENT IMAGE */}
      {imageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Current Image</p>
          <img
            src={imageUrl}
            alt="product"
            width={120}
            style={{ borderRadius: 8 }}
          />
        </div>
      )}

      {/* REPLACE IMAGE */}
      <div style={{ marginTop: "1rem" }}>
        <label>Replace Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files?.[0] || null)}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}