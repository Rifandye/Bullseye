import ProductModel from "@/app/db/models/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const searchQuery = url.searchParams.get("search") || "";

    const data = await ProductModel.getAllProducts(searchQuery);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
