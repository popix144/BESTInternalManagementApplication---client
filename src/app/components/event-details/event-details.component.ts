import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { JwtResponse } from 'src/app/models/jwtResponse.interface';
import { Role } from 'src/app/models/role.enum';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddUpdateDialogComponent } from '../add-update-dialog/add-update-dialog.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  event: any;
  coreTeamMembers: any;
  showUpdates: boolean = false;
  isAdmin: boolean;
  isMainOrganizer: boolean;
  isCoreTeamMember: boolean;
  isLoggedIn: boolean;
  showProgressBar: boolean;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.updateDetails(params);
    }));
    this.subscriptions.push(
      this.loginService.currentUser.subscribe(
        (currentUser: JwtResponse)  => {
          this.isLoggedIn = currentUser !== null;
          if (currentUser !== null) {
            this.isAdmin = false;
            this.isCoreTeamMember = false;
            this.isMainOrganizer = false;
            currentUser.user.roles.forEach(role => { 
              if (role.name === Role.Management) {
                this.isAdmin = true;
              }
              if (role.name === Role.MainOrganizer) {
                this.isMainOrganizer = true;
              }
              if (role.name === Role.CoreTeamMember) {
                this.isCoreTeamMember = true;
              }
          });
          }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  updateDetails(event) {
    this.event = event;
    this.coreTeamMembers = event.coreTeamMembers.split(',');
  }

  changeShowUpdates() {
    this.showUpdates = !this.showUpdates;
  }

  openAddUpdateDialog() {
    const dialogRef = this.dialog.open(AddUpdateDialogComponent, {
      width: '300px',
      data: { update: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgressBar = true;
        this.snackBar.open("Add update dialog was closed.");
        this.showProgressBar = false;
      //   this.categoryService.save({name: this.newCategoryName}).subscribe(
      //     (data) => {
      //       this.getData();
      //     }, (error) => {
      //       this.snackBar.open("Category could not be saved.");
      //       this.showProgressBar = false;
      //     }, () => {
      //       this.showProgressBar = false;
      //   });
      }
    });
  }
}
