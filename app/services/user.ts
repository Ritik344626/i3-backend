
import user, { IUser } from "../schema/user";

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

