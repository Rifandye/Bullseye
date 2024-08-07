import { ObjectId } from "mongodb";
import { getCollection } from "../config/db";

type Product = {
  _id: ObjectId;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

class ProductModel {
  static getCollection() {
    return getCollection("Products");
  }
  static async getAllProducts(searchQuery?: string): Promise<Product[]> {
    let query = {};

    if (searchQuery) {
      query = {
        name: { $regex: searchQuery, $options: "i" },
      };
    }

    const data = await this.getCollection().find(query).toArray();

    return data as Product[];
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.getCollection().findOne({ slug: slug });

    if (!product) {
      throw new Error("Product not found");
    }

    return product as Product;
  }
}

export default ProductModel;
