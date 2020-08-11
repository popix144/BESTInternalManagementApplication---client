import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { PositionService } from 'src/app/services/position.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-event-core-team-dialog',
  templateUrl: './edit-event-core-team-dialog.component.html',
  styleUrls: ['./edit-event-core-team-dialog.component.css']
})
export class EditEventCoreTeamDialogComponent implements OnInit, OnDestroy {
  
  positions = [];
  users: IUser[] = [];
  selectedUsers: IUser[] = [];
  inputForm: FormGroup = new FormGroup({
    user: new FormControl('', [
      Validators.required
    ]),
    position: new FormControl('', [
        Validators.required
    ])
  });
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditEventCoreTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private positionService: PositionService) {}

  ngOnInit() {
    this.subscriptions.push(
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.selectedUsers = this.users;
    }));
    this.subscriptions.push(
    this.positionService.getAll().subscribe(positions => {
      this.positions = positions;
    }));
    this.subscriptions.push(
    this.inputForm.get('user').valueChanges.subscribe(selectedValue => {
      this.data.user = this.userInput.value;
    }));
    this.subscriptions.push(
    this.inputForm.get('position').valueChanges.subscribe(selectedValue => {
      this.data.position = this.positionInput.value.name;
    }));
  }

  search(query: string){
    console.log('query', query)
    this.selectedUsers = this.select(query);
  }

  select(query: string) {
    query.toLowerCase();
    let result = [];
    console.log(this.users);
    this.users.forEach(user => {
      if(user.firstName.toLowerCase().indexOf(query) > -1 || user.lastName.toLowerCase().indexOf(query) > -1){
        result.push(user);
      }
    });
    return result;
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  get userInput() { return this.inputForm.get('user'); }
  get positionInput() { return this.inputForm.get('position'); }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
