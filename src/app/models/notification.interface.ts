import { IUser } from './user.interface';
import { INotificationCategory } from './notificationCategory.interface';

export interface INotification {
    id: number,
    text: string,
    notificationCategories: INotificationCategory[],
    author: IUser
}