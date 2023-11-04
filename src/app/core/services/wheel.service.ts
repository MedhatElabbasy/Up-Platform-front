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

  // spin(spinObject: any): Observable<any> {
  //   return this._HttpClient.post(environment.baseUrl + '/lottery-wheel', spinObject, {
  //     headers: {
  //       ApiKey: environment.ApiKey
  //     }
  //   })
  // }

  getAllPrizes(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/lottery-wheel/prizes', {
      headers: {
        ApiKey: environment.ApiKey
      }
    });
  }

  lotteryWheelOperation(prize_id: number, type: string): Observable<any> {
    const data = {
      prize_id: prize_id,
      type: type
    };

    return this._HttpClient.post(environment.baseUrl + '/lottery-wheel', data, {
      headers: {
        ApiKey: environment.ApiKey
      }
    });
  }


}
