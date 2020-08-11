import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { ClusteringService } from 'src/app/services/clustering.service';
import { ConfirmUsersDialogComponent } from '../confirm-users-dialog/confirm-users-dialog.component';

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
  hide = true;
  submitted = false;
  loading = false;
  showProgressBar: boolean = false;

  constructor(
    private router: Router,
    private clusteringService: ClusteringService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() { }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    this.showProgressBar = true;

    if (this.notificationForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmUsersDialogComponent, {
      width: '300px',
      data: {users: ["User1", "User2", "User3", "User4", "User5", "User6", "User7", "User8",
                  "User9", "User10", "User11", "User12", "User13", "User14", "User15", "User16", "User17", "User18"] }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.showProgressBar = true;
        
      }
    });

    // this.clusteringService.sendNotification(
    //     this.descriptionInput.value, 
    //     { design: this.designInput.value, 
    //       pr: this.prInput.value,
    //       fr: this.frInput.value,
    //       hr: this.hrInput.value,
    //       it: this.itInput.value } )
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //     }, (error) => {
    //       this.snackBar.open("Recommended users could not be sent.");
    //       this.showProgressBar = false;
    //     }, () => {
    //       this.showProgressBar = false;
    //   });
  }

  get descriptionInput() { return this.notificationForm.get('description'); }
  get designInput() { return this.notificationForm.get('design'); }
  get frInput() { return this.notificationForm.get('fr'); }
  get hrInput() { return this.notificationForm.get('hr'); }
  get itInput() { return this.notificationForm.get('it'); }
  get prInput() { return this.notificationForm.get('pr'); }
}

