import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecommendationResponse } from '../models/recommendationResponse.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SendNotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(title, description, grades) {
      return <Observable<IRecommendationResponse>> this.http.post<IRecommendationResponse>(environment.url + `/notifications/send`, 
        {title: title, text: description, notificationCategories: grades});
  }
}
