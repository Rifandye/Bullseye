import { ObjectId } from "mongodb";
import { getCollection } from "../config/db";

type Wishlist = {
  _id: ObjectId;
  userId: string;
  productId: string;
};

type WishlistInput = Omit<Wishlist, "_id">;

class WishlistModel {
  static getCollection() {
    return getCollection("Wishlists");
  }

  static async addWishlist(wishlistInput: WishlistInput): Promise<Wishlist> {
    const result = await this.getCollection().insertOne({
      productId: new ObjectId(wishlistInput.productId),
      userId: new ObjectId(wishlistInput.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      _id: result.insertedId,
      ...wishlistInput,
    };
  }
}

export default WishlistModel;
