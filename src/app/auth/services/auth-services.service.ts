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
    if (localStorage.getItem(environment.localStorageName) != null) {
      this.isUserLoggedIn.next(true)
      this.userToken = localStorage.getItem(environment.localStorageName) || ""
      console.log(environment.localStorageName);
      
    }
  }

  login(loginModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/login', loginModel)
  }

  socialLogin(socialLoginModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/social-login', socialLoginModel)
  }

  profile(profileModel: any): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/user', profileModel)
  }

  register(registerModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/signup', registerModel)
  }

  // emailVerify(emailVerifyModel: any): Observable<any> {
  //   return this._HttpClient.post(environment.baseUrl + '/email/verify', emailVerifyModel)
  // }

  // resendEmailVerify(): Observable<any> {
  //   return this._HttpClient.post(environment.baseUrl + '/email/verify/resend', {})
  // }

  forgetPassword(forgetPasswordModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/password/send-otp', forgetPasswordModel)
  }

  // forgetPasswordVerifyCode(forgetPasswordVerifyCodeModel: any): Observable<any> {
  //   return this._HttpClient.post(environment.baseUrl + '/password/forgot/verify', forgetPasswordVerifyCodeModel)
  // }

  resetPassword(resetPasswordModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/reset', resetPasswordModel)
  }

  logout(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/logout', {})
  }

}
