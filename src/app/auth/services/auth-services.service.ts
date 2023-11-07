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

  // socialLogin(socialLoginModel: any): Observable<any> {
  //   return this._HttpClient.post(environment.baseUrl + '/social-login', socialLoginModel)
  // }

  socialLogin(provider: string, token: string, email: string, name: string): Observable<any> {
    const socialLoginModel = {
      provider_name: provider,
      token: token,
      email: email,
      name: name,
    };
    return this._HttpClient.post(environment.baseUrl + '/social-login', socialLoginModel);
  }

  profile(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/user`);
  }

  register(registerModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/signup', registerModel)
  }

  sendPhoneCode(phone: string): Observable<any> {
    const phoneData = { phone: phone };
    return this._HttpClient.post(environment.baseUrl + '/send-phone-otp', phoneData)
  }

  phoneVerify(phoneVerifyModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/activate-phone', phoneVerifyModel)
  }

  emailVerify(emailVerifyModel: any): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/email/verify', emailVerifyModel)
  }

  resendEmailVerify(): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + '/email/verify/resend', {})
  }

  forgetPassword(email: string): Observable<any> {
    const emailData = { email: email };
    return this._HttpClient.post(environment.baseUrl + '/send-otp', emailData);
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
