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

  static async getAllWishList(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetail",
        },
      },
      {
        $unwind: {
          path: "$userDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "userDetail.password": 0,
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetail",
        },
      },
    ];

    const wishlist = await this.getCollection().aggregate(agg).toArray();

    return wishlist;
  }
}

export default WishlistModel;
