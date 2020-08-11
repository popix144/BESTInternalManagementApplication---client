import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IEvent } from 'src/app/models/event.interface';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'since', 'details'];
  events = new MatTableDataSource<IEvent>();

  constructor(private router: Router,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAll().pipe(first()).subscribe(events => {
      this.events.data = events;
    });
  }

  ngOnDestroy() {}

  viewDetails(event: IEvent) {
    let coreTeamMembers = '';
    if(event.coreTeamMembers.length > 0) {
      event.coreTeamMembers.forEach(member => {
        coreTeamMembers += member.user.firstName + ' ' + member.user.lastName + ',';
      })
    }
    let mainOrganizer = null;
    if(event.mainOrganizer !== null) {
      mainOrganizer = event.mainOrganizer.firstName + ' ' + event.mainOrganizer.lastName;
    }
    this.router.navigate(['eventDetails'], { queryParams: {
      id: event.id,
      name: event.name,
      firstYear: event.firstYear,
      description: event.description,
      coreTeamMembers: coreTeamMembers,
      mainOrganizer: mainOrganizer
    }});
  }
}