import { INotificationCategory } from './notificationCategory.interface';
import { IUserShort } from './userShort.interface';

export interface INotification {
    id: number,
    text: string,
    title: string,
    notificationCategories: INotificationCategory[],
    author: IUserShort
}