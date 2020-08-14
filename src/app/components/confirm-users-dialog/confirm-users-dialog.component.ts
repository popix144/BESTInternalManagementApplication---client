import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { IUserSubscription } from 'src/app/models/userSubscription.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-users-dialog',
  templateUrl: './confirm-users-dialog.component.html',
  styleUrls: ['./confirm-users-dialog.component.css']
})
export class ConfirmUsersDialogComponent {

  checked: boolean;
  users: IUserSubscription[] = [];
  selectedOptions: IUserSubscription[];
  formControl: FormControl;

  constructor(public dialogRef: MatDialogRef<ConfirmUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.checked = true;
    this.selectedOptions = this.data.users;
    this.users = this.data.users.slice();
    this.formControl = new FormControl(this.selectedOptions);
  }

  onSelectedOptionsChange() {
    this.data.users = this.formControl.value;
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  comparator(r1: IUserSubscription, r2: IUserSubscription) {
    return r1 && r2 && r1.id === r2.id && r1.firstRoundRecommended && r2.firstRoundRecommended;
  }
}
