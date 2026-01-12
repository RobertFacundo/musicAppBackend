import { IUser, UserModel } from "../../shared/models/user.model";
import { hashPassword, comparePassword } from "../../shared/utils/password";
import { signToken } from "../../shared/utils/jwt";
import { RegisterDTO, LoginDTO, AuthResponse, PublicUser } from "./auth.types";
import { AppError } from "../../shared/errors/AppError";

const toPublicUser = (user: IUser): PublicUser => {
    const { passwordHash, ...publicUser } = user.toObject()
    return publicUser as PublicUser
};

export const register = async (
    data: RegisterDTO
): Promise<AuthResponse> => {
    const { username, email, password } = data

    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
        throw new AppError('User already exists', 409)
    }

    const passwordHash = await hashPassword(password)

    const user = await UserModel.create({
        username,
        email,
        passwordHash,
    });

    const token = signToken({ userId: user._id.toString() })

    return {
        user: toPublicUser(user),
        token,
    }
}

export const login = async (
    data: LoginDTO
): Promise<AuthResponse> => {
    const { email, password } = data

    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const isValid = await comparePassword(password, user.passwordHash)

    if (!isValid) {
        throw new AppError('Invalid credentials', 401)
    }

    const token = signToken({ userId: user._id.toString() })

    return {
        user: toPublicUser(user),
        token
    }
}

export const getMe = async (userId: string): Promise<PublicUser> => {
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new AppError('User not found', 404)
    }

    return toPublicUser(user)
}