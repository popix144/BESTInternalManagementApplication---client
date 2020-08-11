import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-users-dialog',
  templateUrl: './confirm-users-dialog.component.html',
  styleUrls: ['./confirm-users-dialog.component.css']
})
export class ConfirmUsersDialogComponent {

  checked: boolean;
  selectedOptions: String[];
  formControl: FormControl;

  constructor(public dialogRef: MatDialogRef<ConfirmUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.checked = true;
    this.selectedOptions = ["User1", "User2", "User9", "User10", "User11", "User12", "User13"];
    this.formControl = new FormControl(this.selectedOptions);
  }

  onSelectedOptionsChange() {
    this.data.users = this.formControl.value;
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  comparator(r1: string, r2: string) {
    return r1 && r2 && r1 === r2;
  }
}
