import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// ZOD SCHEMA 

const baseProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")),
});

// GET ALL PRODUCTS 

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// CREATE PRODUCT 

export async function POST(req: Request) {
  const body = await req.json();

  const result = baseProductSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    const message =
      errors.name?.[0] ||
      errors.price?.[0] ||
      errors.imageUrl?.[0] ||
      "Invalid input";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }

  const { name, price, imageUrl } = result.data;

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      price,
      imageUrl: imageUrl ?? null,
    },
  });

  return NextResponse.json(product);
}

// DELETE PRODUCT 

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

// UPDATE PRODUCT 

export async function PUT(req: Request) {
  const body = await req.json();

  const updateSchema = baseProductSchema.extend({
    id: z.number(),
  });

  const result = updateSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    const message =
      errors.name?.[0] ||
      errors.price?.[0] ||
      errors.imageUrl?.[0] ||
      "Invalid input";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }

  const { id, name, price, imageUrl } = result.data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: name.trim(),
      price,
      ...(imageUrl !== undefined && { imageUrl }),
    },
  });

  return NextResponse.json(product);
}