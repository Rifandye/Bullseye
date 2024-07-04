import { ObjectId } from "mongodb";
import { z } from "zod";
import { getCollection } from "../config/db";
import { hashPass } from "../helpers/bcrypt";

type User = {
  _id: ObjectId;
  username: string;
  password: string;
};

type NewUserInput = Omit<User, "_id">;

const UserInputSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(5).max(10),
  password: z.string({ required_error: "Password is required" }).min(5).max(10),
});

class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async register(newUser: NewUserInput): Promise<void> {
    const parseResult = UserInputSchema.safeParse(newUser);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const user = await this.getCollection().findOne({
      username: newUser.username,
    });

    if (user) {
      throw new Error("Username already exists");
    }

    await this.getCollection().insertOne({
      ...newUser,
      password: hashPass(newUser.password),
    });
  }
}

export default UserModel;
