import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WheelService {

  constructor(private _HttpClient: HttpClient) { }

  canSpin(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/lottery-wheel', {
      headers: {
        ApiKey: environment.ApiKey
      }
    })
  }

  spin(spinObject: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/lottery-wheel', spinObject, {
      headers: {
        ApiKey: environment.ApiKey
      }
    })
  }


}
