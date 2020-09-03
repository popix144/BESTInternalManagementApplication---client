import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmUsersDialogComponent } from '../confirm-users-dialog/confirm-users-dialog.component';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { SendNotificationService } from 'src/app/services/send-notification.service';
import { IRecommendationResponse } from 'src/app/models/recommendationResponse.interface';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from 'src/app/models/category.interface';

// const webPush = require('web-push');
// console.log('webpush import', webPush);

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit, OnDestroy {

  notificationForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    design: new FormControl('', [
        Validators.required
    ]),
    it: new FormControl('', [
      Validators.required
    ]),
    fr: new FormControl('', [
      Validators.required
    ]),
    hr: new FormControl('', [
      Validators.required
    ]),
    pr: new FormControl('', [
      Validators.required
    ])
  });
  submitted = false;
  loading = false;
  showProgressBar: boolean = false;
  categories: ICategory[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private categoryService: CategoryService,
    private sendNotificationService: SendNotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.categoryService.getAll().subscribe(categories => this.categories = categories));
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    this.showProgressBar = true;

    if (this.notificationForm.invalid) {
      return;
    }

    this.subscriptions.push(this.sendNotificationService.sendNotification(
        this.titleInput.value,
        this.descriptionInput.value, 
        { design: this.designInput.value, 
          pr: this.prInput.value,
          fr: this.frInput.value,
          hr: this.hrInput.value,
          it: this.itInput.value } )
      .subscribe(
        (data) => {
          console.log(data);

          const dialogRef = this.dialog.open(ConfirmUsersDialogComponent, {
            width: '90%',
            data: JSON.parse(JSON.stringify(data))
          });
      
          dialogRef.afterClosed().subscribe((result: IRecommendationResponse) => {
            if (result) {
              console.log("Before start sending notification.");
              this.sendNotification(result);
            }
          });
        }, (error) => {
          this.snackBar.open("Recommended users could not be sent.");
          this.showProgressBar = false;
        }, () => {
          this.showProgressBar = false;
      }));
  }

  get titleInput() { return this.notificationForm.get('title')}
  get descriptionInput() { return this.notificationForm.get('description'); }
  get designInput() { return this.notificationForm.get('design'); }
  get frInput() { return this.notificationForm.get('fr'); }
  get hrInput() { return this.notificationForm.get('hr'); }
  get itInput() { return this.notificationForm.get('it'); }
  get prInput() { return this.notificationForm.get('pr'); }

  sendNotification(result: IRecommendationResponse) {
    console.log("Start sending notification.");
    console.log(result);

    const webPush = require('web-push');
    console.log('webPush', webPush);

    const notificationPayload = {
      "notification": {
          "title": result.notification.title,
          "body": result.notification.text,
          "icon": "../../../assets/icons/icon-96x96.png",
          "vibrate": [100, 50, 100],
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          }
      }
    };

    webPush.setVapidDetails(
      'mailto:ioanapopa144@gmail.com',
      environment.VAPID_PUBLIC_KEY,
      environment.VAPID_PRIVATE_KEY
    );

    let allSubscriptions = [];

    result.users.forEach(user => {
      if (user.subscriptionDTO !== null) {
        let subscription = {
          "endpoint": user.subscriptionDTO.endpoint,
          "expirationTime": user.subscriptionDTO.expirationTime,
          "keys": {
            "p256dh": user.subscriptionDTO.p256dh,
            "auth": user.subscriptionDTO.auth
          }
        };
        allSubscriptions.push(subscription);
      }
    })

    console.log('Number of subscriptions: ', allSubscriptions.length);

    Promise.all(allSubscriptions.map(sub => {
      console.log("Subscription: ", sub);
      webPush.sendNotification(sub, JSON.stringify(notificationPayload))
    }))
      .then(() => {
          this.showProgressBar = false;
          this.snackBar.open("Notification sent successfully.");
      })
      .catch(err => {
          console.log("Error: ", err);
          this.showProgressBar = false;
          this.snackBar.open("Error sending notification.");
      });
  }
}