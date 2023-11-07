import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient: HttpClient) { }

  getWalletCredit(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/wallet'
    )
  }
}
