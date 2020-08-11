import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ISubscription } from '../models/subscription.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  addSubscriber(sub) {
    const subJSON = JSON.parse(JSON.stringify(sub));
    const subscriptionDTO: ISubscription = {
      endpoint: sub.endpoint,
      expirationTime: sub.expirationTime,
      p256dh: subJSON.keys.p256dh,
      auth: subJSON.keys.auth
    };
    return this.http.post(environment.url + '/subscriptions/save', subscriptionDTO);
  }
}
