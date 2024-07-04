import WishlistModel from "@/app/db/models/wishlists";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-id-user") as string;
    const body = await request.json();

    const wishlist = await WishlistModel.addWishlist({
      productId: body.productId,
      userId: userId,
    });

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-id-user") as string;
    const wishlist = await WishlistModel.getAllWishList(userId);

    return NextResponse.json(wishlist);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
