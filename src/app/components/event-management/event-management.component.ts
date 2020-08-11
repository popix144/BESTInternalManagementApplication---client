import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { IEvent } from 'src/app/models/event.interface';
import { EditEventInfoDialogComponent } from '../edit-event-info-dialog/edit-event-info-dialog.component';
import { EditEventMainOrganizerDialogComponent } from '../edit-event-main-organizer-dialog/edit-event-main-organizer-dialog.component';
import { EditEventCoreTeamDialogComponent } from '../edit-event-core-team-dialog/edit-event-core-team-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class EventManagementComponent implements OnInit {

  columns = { name: 'Name', firstYear: 'First Year'}
  displayedColumns: string[] = ['name', 'firstYear'];
  events = new MatTableDataSource<IEvent>();
  expandedEvent: IEvent | null;
  showProgressBar: boolean = false;

  constructor(private eventService: EventService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.events.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.eventService.getAll().subscribe(events => {
      this.events.data = events;
    });
  }

  ngOnDestroy() {}

  editInfo(event: IEvent) {
    const dialogRef = this.dialog.open(EditEventInfoDialogComponent, {
      width: '300px',
      data: { event: JSON.parse(JSON.stringify(event)) }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showProgressBar = true;
        this.eventService.updateEventInfo(result.event).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("Event Info could not be updated.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }

  editMainOrganizer(event: IEvent) {
    const dialogRef = this.dialog.open(EditEventMainOrganizerDialogComponent, {
      width: '300px',
      data: { event: JSON.parse(JSON.stringify(event)) }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.showProgressBar = true;
        this.eventService.updateMainOrganizer(result.event, result.event.mainOrganizer).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("Event Main Organizer could not be updated.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }

  addCoreTeamMember(event: IEvent) {
    const dialogRef = this.dialog.open(EditEventCoreTeamDialogComponent, {
      width: '300px',
      data: { user: null, position: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showProgressBar = true;
        this.eventService.addCoreTeamMember(event.id, result.user.id, result.position).subscribe(
          (data) => {
            this.getData();
          }, (error) => {
            this.snackBar.open("Core Team Member could not be added.");
            this.showProgressBar = false;
          }, () => {
            this.showProgressBar = false;
        });
      }
    });
  }

  removeCoreTeamMember(cTM) {
    this.showProgressBar = true;
    this.eventService.removeCoreTeamMember(cTM).subscribe(
      (data) => {
        this.getData();
      }, (error) => {
        this.snackBar.open("Core Team Member could not be deleted.");
        this.showProgressBar = false;
      }, () => {
        this.showProgressBar = false;
    });;
  }
  
}
