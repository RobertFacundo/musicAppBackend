import { Schema, model, Document } from 'mongoose';

export type UserRole = 'USER' | 'ADMIN';

export interface IUser extends Document {
    username: string
    email: string
    passwordHash: string

    role: UserRole
    isPremium: boolean

    favorites: string[]
    history: string[]

    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        favorites: {
            type: [String],
            default: [],
        },
        history: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model<IUser>('User', UserSchema);