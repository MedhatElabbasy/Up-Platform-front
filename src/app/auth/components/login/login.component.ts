import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthServices } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDetails: any = {};
  hide = true;
  isLoading: boolean = false
  errorMessage: string = ""
  rememberMe: boolean = true;
  private accessToken = '';
  that: any
  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
  ) {
  }

  ngOnInit() {
    localStorage.removeItem(environment.localStorageName);
    sessionStorage.removeItem(environment.localStorageName);
  }

  loginForm: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required]),
    // password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  })

  login(loginForm: FormGroup, rememberMe: boolean) {
    console.log(loginForm);

    if (loginForm.valid) {
      console.log("true");
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.login(loginForm.value).subscribe({
          next: (res: any) => {
            // localStorage.setItem(environment.userData, jwt_decode)
            console.log(res);
            if (rememberMe) {
              localStorage.setItem(environment.localStorageName, res.data.access_token)
              this.getUserDetails();
            } else {
              sessionStorage.setItem(environment.localStorageName, res.data.access_token)
              this._AuthService.profile().subscribe(
                (data: any) => {
                  this.userDetails = data.data;
                  console.log(this.userDetails);
                  sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
                },
                (error: any) => {
                  console.error('Error fetching user details', error);
                }
              );
            }
            
            this._AuthService.isUserLoggedIn.next(true)
            if(res.data.is_verify){
              this.isUserLoggedIn.next(true);
              this._Router.navigate(['/']);
              this.isLoading = false
            }else{
              this._Router.navigate(['/auth/verify-account']);
              this.isLoading = false
            }
          },
          error: (err: any) => {
            console.log(err.message);
            this.errorMessage = err.message.split(" ").slice(0, 3).join(" ")
            this.isLoading = false
          }
        })
      }
    } else {
      console.log("false");
       this.loginForm.markAllAsTouched()
     }
  }

   ngAfterViewInit(): void {
    this.signInWithGoogle()
   }

  signInWithGoogle() {
    const button = document.getElementById('google-signin-button');
    const that = this;
    google.accounts.id.initialize({
      client_id: '605141817130-p3r8jrcukibc9ehs66dl3ls9bn1gja0o.apps.googleusercontent.com',
      callback: function (response: any) {
        that.onGoogleSignIn(response);
      }
    });
    google.accounts.id.renderButton(button, {
      // type: 'standard',
      size: 'large',
      //theme: 'filled_blue'
    });
     
  }
  
  onGoogleSignIn(response: any) {
    // Handle the Google Sign-In response here
    if (response.credential) {
      const googleToken = response.credential;
      this.loginWithGoogle(googleToken);
    }
  }
  
  loginWithGoogle(token: string) {
    const tokenPayload = token.split('.')[1];
    const decodedPayload = atob(tokenPayload);
    const payload = JSON.parse(decodedPayload);
    this._AuthService.socialLogin('google', token, payload.email, payload.name).subscribe(
      (response) => {
        console.log('Social login response:', response);
        localStorage.setItem(environment.localStorageName, response.data.access_token);
        this.getUserDetails();
        this._Router.navigate(['/']);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      },
      (error) => {
        console.error('Social login error:', error);
      }
    );
  }

  getUserDetails() {
    this._AuthService.profile().subscribe(
      (data: any) => {
        this.userDetails = data.data;
        console.log(this.userDetails);
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      },
      (error: any) => {
        console.error('Error fetching user details', error);
      }
    );
  }
  
}
