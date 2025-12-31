"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const router = useRouter();

  // step control
  const [step, setStep] = useState(1);

  // product fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ui states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1
  function handleStepOne(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setStep(2);
  }

  //FINAL SUBMIT 
  async function handleFinalSubmit() {
    setLoading(true);
    setError("");

    let imageUrl = "";

    // upload image to cloudinary
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setError("Image upload failed");
        setLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    // create product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        imageUrl,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/dashboard/products");
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Add New Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleStepOne}>
          <div>
            <label>Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>
            Next →
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h2>Upload Product Image</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => setStep(1)}>← Back</button>

            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              style={{ marginLeft: "1rem" }}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}