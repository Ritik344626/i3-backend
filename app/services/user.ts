
import createHttpError from "http-errors";
import user, { IUser } from "../schema/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (data: IUser) => {
    const result = await user.create({ ...data, active: true });
    return result;
};

export const updateUser = async (id: string, data: IUser) => {
    const result = await user.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await user.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await user.deleteOne({ _id: id });
    return result;
};

export const getUserById = async (id: string) => {
    const result = await user.findById(id).lean();
    return result;
};

export const getAllUser = async () => {
    const result = await user.find({}).lean();
    return result;
};

export const getUserByEmail = async (email: string) => {
    const result = await user.findOne({ email }).lean();
    return result;
}

export const loginUser = async (email: string, password: string) => {
    try {
      const users = await getUserByEmail(email);
      if (users == null) {
        throw createHttpError(401, "User not found!");
      }
  
      if (!users.active) {
        throw createHttpError(401, "User is inactive");
      }
  
      const isPasswordValid = await bcrypt.compare(password, users.password);
      if (!isPasswordValid) {
        throw createHttpError(401, "Invalid email or password");
      }
  
      const { password: _p, ...userWithoutPassword } = users;
      const accessToken = jwt.sign(userWithoutPassword, process.env.JWT_SECRET ?? "", {
        expiresIn: "1h",
      });
  
      const refreshToken = jwt.sign(userWithoutPassword, process.env.JWT_SECRET ?? "", {
        expiresIn: "7d",
      });
  
      return { accessToken, refreshToken };
  
    } catch (error: any) {
      throw createHttpError(500, error?.message);
    }
  };