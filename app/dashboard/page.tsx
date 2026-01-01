import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const admin = cookieStore.get("admin");

  if (!admin || admin.value !== "true") {
    redirect("/login");
  }

  const rawProducts = await prisma.product.findMany();

  const products = rawProducts.map((p) => ({
    name: p.name,
    price: Number(p.price ?? 0),
  }));

  return <DashboardClient products={products} />;
}