import { INotification } from './notification.interface';
import { IUserSubscription } from './userSubscription.interface';

export interface IRecommendationResponse {
    notification: INotification,
    users: IUserSubscription[]
}