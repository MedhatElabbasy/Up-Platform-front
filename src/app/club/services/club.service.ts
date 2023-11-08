import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private _HttpClient: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/club-events')
  }

  getAllLocations(){
    return this._HttpClient.get(environment.baseUrl + '/club-event/locations')
  }

  getAllLocationEvents(location:string){
    return this._HttpClient.get(environment.baseUrl + `/club-event/location-events?location=${location}`)
  }

  getEventsByID(user_id:number){
    return this._HttpClient.get(environment.baseUrl + `/club-event/user/events/${user_id}`)
  }

  getOneEvent(event_id:number){
    return this._HttpClient.get(environment.baseUrl + `/club-events/${event_id}`)
  }
}