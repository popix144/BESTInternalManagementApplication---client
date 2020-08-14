import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { ConfirmUsersDialogComponent } from '../confirm-users-dialog/confirm-users-dialog.component';
import { ICategory } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { SendNotificationService } from 'src/app/services/send-notification.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  notificationForm: FormGroup = new FormGroup({
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
    private router: Router,
    private categoryService: CategoryService,
    private sendNotificationService: SendNotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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

    this.sendNotificationService.sendNotification(
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
            width: '300px',
            data: JSON.parse(JSON.stringify(data))
          });
      
          dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
              console.log(result);
            }
          });

        }, (error) => {
          this.snackBar.open("Recommended users could not be sent.");
          this.showProgressBar = false;
        }, () => {
          this.showProgressBar = false;
      });
  }

  get descriptionInput() { return this.notificationForm.get('description'); }
  get designInput() { return this.notificationForm.get('design'); }
  get frInput() { return this.notificationForm.get('fr'); }
  get hrInput() { return this.notificationForm.get('hr'); }
  get itInput() { return this.notificationForm.get('it'); }
  get prInput() { return this.notificationForm.get('pr'); }
}

