import { ISubscription } from './subscription.interface';

export interface IUserSubscription {
    id: number,
    firstName: string,
    lastName: string,
    subscriptionDTO: ISubscription,
    fit: boolean,
    computed: boolean,
    firstRoundRecommended: boolean
  }