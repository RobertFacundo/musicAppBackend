import { AppError } from "../../shared/errors/AppError";
import { UserModel } from "../../shared/models/user.model";

interface AddHistoryDTO {
    type: 'track' | 'artist' | 'album';
    deezerId: string;
    title: string;
    image?: string;
}

export const toggleFavorite = async (
    userId: string,
    trackId: string
) => {
    const user = await UserModel.findById(userId);
    console.log(user, 'log de togglefavorite service')
    if (!user) throw new AppError('user not found', 404);

    const index = user.favorites.indexOf(trackId);

    if (index === -1) {
        user.favorites.push(trackId);
    } else {
        user.favorites.splice(index, 1);
    }

    await user.save();

    return user;
}

export const addHistory = async (userId: string, data: AddHistoryDTO) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    user.history = user.history.filter(
        (item) => item.deezerId !== data.deezerId
    );

    user.history.unshift({
        ...data,
        createdAt: new Date()
    });

    user.history = user.history.slice(0, 50);

    await user.save();

    return user;
}