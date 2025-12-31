"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    console.log("DELETE CLICKED", id);

    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return <button onClick={handleDelete}>Delete</button>;
}