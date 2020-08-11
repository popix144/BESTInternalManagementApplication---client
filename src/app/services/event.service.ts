import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../models/event.interface';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../models/user.interface';
import { ICoreTeamMember } from '../models/coreTeamMember.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll() {
      return <Observable<IEvent[]>> this.http.get<IEvent[]>(environment.url + `/events/all`);
  }

  updateEventInfo(event: IEvent) {
    return this.http.put(environment.url + '/events/' + event.id, {
      name: event.name,
      firstYear: event.firstYear,
      description: event.description
    });
  }

  updateMainOrganizer(event: IEvent, user: IUser) {
    return this.http.put(environment.url + '/events/' + event.id + '/mainOrganizer/' + user.id, null);
  }

  removeCoreTeamMember(cTM: ICoreTeamMember) {
    return this.http.delete(environment.url + '/events/' + cTM.event + '/coreTeam/' + cTM.user.id);
  }

  addCoreTeamMember(eventId, userId, position) {
    return this.http.post(environment.url + '/events/' + eventId + '/coreTeam/' + userId,  position);
  }
}
