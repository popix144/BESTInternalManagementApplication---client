import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-event-info-dialog',
  templateUrl: './edit-event-info-dialog.component.html',
  styleUrls: ['./edit-event-info-dialog.component.css']
})
export class EditEventInfoDialogComponent implements OnInit {

  initialValue: any;
  firstYearControl = new FormControl(this.data.event.firstYear, [Validators.min(1995), Validators.max(new Date().getFullYear())]);
  descriptionControl = new FormControl(this.data.event.description);
  formGroup: FormGroup = new FormGroup({
    description: this.descriptionControl, 
    firstYear: this.firstYearControl
  });

  constructor(public dialogRef: MatDialogRef<EditEventInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
