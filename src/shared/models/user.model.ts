import { Schema, model, Document } from 'mongoose';

export type UserRole = 'USER' | 'ADMIN';

export interface HistoryItem {
    type: 'track' | 'artist' | 'album';
    deezerId: string;
    title: string;
    image?: string;
    createdAt: Date;
}

export interface IUser extends Document {
    username: string
    email: string
    passwordHash: string

    role: UserRole
    isPremium: boolean

    favorites: string[]
    history: HistoryItem[]

    createdAt: Date
    updatedAt: Date
}

const HistorySchema = new Schema<HistoryItem>(
    {
        type: {
            type: String,
            enum: ['track', 'artist', 'album'],
            required: true,
        },
        deezerId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

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
            type: [HistorySchema],
            default:[]
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model<IUser>('User', UserSchema);