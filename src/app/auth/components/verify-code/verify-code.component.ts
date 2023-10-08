import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {
  isLoading: boolean = false
  isResendEmailLoading: boolean = false
  errorMessage: string = ""
  resendMessage: string = ""
  userEmail: string = ""

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
    private _ActivatedRoute:ActivatedRoute
  ) {
    _ActivatedRoute.params.subscribe((res) => {
      this.userEmail = res['email']
    })
  }


  verifyCodeForm: FormGroup = new FormGroup({

    code: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

  })




  verifyCode(verifyCodeForm: any) {
    console.log(verifyCodeForm.value);

    ////auth/password/forgot/verify  => send code to email to reset password 
    if (this.userEmail) {
      this.verifyCodeForm.patchValue({
        email: this.userEmail
      })
      if (verifyCodeForm.valid) {
        this.errorMessage = ""
        if (!this.isLoading) {
          this.isLoading = true
          this._AuthService.forgetPasswordVerifyCode(verifyCodeForm.value).subscribe({
            next: (res: any) => {
              // localStorage.setItem(environment.userData, jwt_decode)
              console.log(res);
              this._Router.navigate(['/auth/reset-password/' + this.userEmail + '/'+ verifyCodeForm.value.code ])
              this.isLoading = false
            },
            error: (err: any) => {
              console.log(err.message);
              this.errorMessage = err.message
              this.isLoading = false
            }
          })
        }
  
      } else {
        this.verifyCodeForm.markAllAsTouched()
      }
    }
    ////auth/email/verify   => email verify after registration
    else {
      
      this.verifyCodeForm.patchValue({
        email: 'test@test.test'
      })
      if (verifyCodeForm.valid) {
        this.errorMessage = ""
        if (!this.isLoading) {
          this.isLoading = true
          this._AuthService.emailVerify(verifyCodeForm.value).subscribe({
            next: (res: any) => {
              // localStorage.setItem(environment.userData, jwt_decode)
              console.log(res);
              this._Router.navigate(['/auth/success'])
              this.isLoading = false
            },
            error: (err: any) => {
              console.log(err.message);
              this.errorMessage = err.message
              this.isLoading = false
            }
          })
        }
  
      } else {
        this.verifyCodeForm.markAllAsTouched()
      }
    }

   
  }

  resendEmailVerify() {
    this.resendMessage = ""
    this.isResendEmailLoading = true
    this._AuthService.resendEmailVerify().subscribe({
      next: (res) => {
        this.isResendEmailLoading = false
        console.log(res);
        this.resendMessage = "تم إرسال الكود الى البريد الإلكتروني الخاص بك"

      },
      error: (err) => {
        this.isResendEmailLoading = false
        this.resendMessage = err.message
        console.log(err);

      }
    })
  }
}
