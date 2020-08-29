import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { IUser } from 'src/app/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class UserManagementComponent implements OnInit, OnDestroy {

  columns = { firstName: 'First Name', lastName: 'Last Name', enabled: 'Is enabled'}
  displayedColumns: string[] = ['firstName', 'lastName', 'enabled'];
  users = new MatTableDataSource<IUser>();
  expandedUser: IUser | null;
  showProgressBar: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.subscriptions.push(this.userService.getAll().subscribe(users => {
      this.users.data = users;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  edit(user: IUser) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '300px',
      data: {user: JSON.parse(JSON.stringify(user)) }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.showProgressBar = true;
        this.userService.update(result.user).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("User could not be updated.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
        this.userService.updateUserCategories(result.user).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("User categories could not be updated.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }
}
