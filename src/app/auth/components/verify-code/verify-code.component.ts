import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';
import { Router } from '@angular/router';
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

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
  ) {

  }


  verifyCodeForm: FormGroup = new FormGroup({

    code: new FormControl('', [Validators.required]),

  })




  verifyCode(verifyCodeForm: any) {
    console.log(verifyCodeForm);

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
