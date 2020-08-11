import { INotification } from '../models/notification.interface';
import { IUserSubscription } from '../models/userSubscription.interface';

export interface IRecommendationRespose {
    notification: INotification,
    userSubscriptionDTO: IUserSubscription[]
}