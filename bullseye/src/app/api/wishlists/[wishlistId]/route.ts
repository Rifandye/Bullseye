import WishlistModel from "@/app/db/models/wishlists";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { wishlistId: string } }
) {
  try {
    const id = params.wishlistId;
    await WishlistModel.deleteWishlist(id);

    return NextResponse.json({ message: "Delete successfull" });
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
