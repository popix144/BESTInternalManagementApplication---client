import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatSelectionList, MatSelectionListChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-event-main-organizer-dialog',
  templateUrl: './edit-event-main-organizer-dialog.component.html',
  styleUrls: ['./edit-event-main-organizer-dialog.component.css']
})
export class EditEventMainOrganizerDialogComponent implements OnInit, OnDestroy {

  @ViewChild(MatSelectionList, { static: true }) list: MatSelectionList;
  users: IUser[];
  selectedOption: IUser;
  subscription: Subscription;
  initialSelect: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditEventMainOrganizerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
      this.initialSelect = data.event.mainOrganizer !== null;
    }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
    this.subscription = this.list.selectionChange.subscribe((s: MatSelectionListChange) => {             
      this.list.deselectAll();
      s.option.selected = true;
      this.data.event.mainOrganizer = s.option.value;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
