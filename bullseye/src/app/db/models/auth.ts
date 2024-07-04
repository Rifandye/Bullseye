import { ObjectId } from "mongodb";
import { z } from "zod";
import { getCollection } from "../config/db";
import { comparePass, hashPass } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

type User = {
  _id: ObjectId;
  username: string;
  password: string;
};

type NewUserInput = Omit<User, "_id">;
type UserLoginInput = Omit<User, "_id">;

const UserInputSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(5).max(10),
  password: z.string({ required_error: "Password is required" }).min(5).max(10),
});

const LoginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
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

  static async login(loginInput: UserLoginInput): Promise<string> {
    const parseResult = LoginInputSchema.safeParse(loginInput);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const user = await this.getCollection().findOne({
      username: loginInput.username,
    });

    if (!user) {
      throw new Error("Invalid username/password");
    }

    const comparedPass = comparePass(loginInput.password, user.password);

    if (!comparedPass) {
      throw new Error("Invalid username/password");
    }

    const access_token = signToken({
      id: user._id.toString(),
      username: user.username,
    });

    return access_token;
  }
}

export default UserModel;
