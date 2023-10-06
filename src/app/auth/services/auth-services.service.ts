import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  userInfo: BehaviorSubject<any> = new BehaviorSubject({})
  userToken: string = ""
  constructor(private _HttpClient: HttpClient) { 
    if(localStorage.getItem(environment.localStorageName) != null){
      this.isUserLoggedIn.next(true)      
    }
  }

  login(loginModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/login', loginModel)
  }

  register(registerModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/register', registerModel)
  }

  emailVerify(emailVerifyModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/email/verify', emailVerifyModel)
  }

  resendEmailVerify(): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/email/verify/resend', {})
  }

  forgetPassword(forgetPasswordModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/password/forgot', forgetPasswordModel)
  }

  forgetPasswordVerifyCode(forgetPasswordVerifyCodeModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/password/forgot/verify', forgetPasswordVerifyCodeModel)
  }

  resetPassword(resetPasswordModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/password/reset', resetPasswordModel)
  }

  logout(): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/auth/logout', {})
  }






}
