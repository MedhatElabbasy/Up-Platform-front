import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthServices } from '../../services/auth-services.service';
import { Router } from '@angular/router';

declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  
  hide = true;
  isLoading: boolean = false
  errorMessage: string = ""
  private accessToken = '';
  that: any
  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
  ) {
  }


  loginForm: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),

  })


  login(loginForm: FormGroup) {
    console.log(loginForm);

    if (loginForm.valid) {
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.login(loginForm.value).subscribe({
          next: (res: any) => {
            // localStorage.setItem(environment.userData, jwt_decode)
            console.log(res);
            localStorage.setItem(environment.localStorageName, res.data.token)
            this._AuthService.isUserLoggedIn.next(true)
            this._Router.navigate(['/'])
            this.isLoading = false
          },
          error: (err: any) => {
            console.log(err.message);
            this.errorMessage = err.message.split(" ").slice(0, 3).join(" ")
            this.isLoading = false
          }
        })
      }

    } else {
      this.loginForm.markAllAsTouched()
    }
  }


  // loginWithGoogle() {
  //   console.log("Hi");
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
  //     console.log(res);

  //   });

  // }

  // loginWithGoogle(): void {
  //   console.log(this._SocialAuthService);
    
  //   this._SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  ngAfterViewInit(): void {
    // const button = document.getElementById('google-signin-button');
    // google.accounts.id.initialize({
    //   client_id: '605141817130-p3r8jrcukibc9ehs66dl3ls9bn1gja0o.apps.googleusercontent.com',
    //   callback: this.onGoogleSignIn, // Define your callback function
    // });
    // google.accounts.id.renderButton(button, {
    //   // type: 'standard',
    //   size: 'large',
    //   // theme: 'filled_blue'
    // });
  }
  // onGoogleSignIn(response: any) {
  //   // Handle the Google Sign-In response here
  //   console.log('Google Sign-In Response:', response);
  // }

}
