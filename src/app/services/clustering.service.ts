import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IUserSubscription } from '../models/userSubscription.interface';
import { IRecommendationRespose } from './recommendationResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {

  constructor(private http: HttpClient) { }

  sendNotification(description, grades) {
      return <Observable<IRecommendationRespose[]>> this.http.post<IRecommendationRespose[]>(environment.url + `/notifications/send`, 
        {text: description, notificationCategories: grades});
  }
}
