import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthServices } from '../../services/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  hide = true;
  isLoading: boolean = false
  isResendEmailLoading: boolean = false
  errorMessage: string = ""
  resendMessage: string = ""
  userEmail: string = ""
  otp: number = 0

  passwordConfirmationValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _ActivatedRoute.params.subscribe((res) => {
      this.userEmail = res['email']
      this.otp = +res['code']
    })
  }

  resetForm: FormGroup = new FormGroup({

    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    confirm_password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl('', [Validators.required]),

  }, { validators: this.passwordConfirmationValidator });


  reset(resetForm: FormGroup) {
   // console.log(resetForm);
    this.resetForm.patchValue({
      email: this.userEmail,
      otp: this.otp
    })

    if (this.resetForm.valid) {
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.resetPassword(this.resetForm.value).subscribe({
          next: (res: any) => {
            // localStorage.setItem(environment.userData, jwt_decode)
            console.log(res.success);
            if(res.success){
              this._Router.navigate(['/auth/success'])
              this.isLoading = false
            }
            else{
              this.errorMessage = "الكود الذي قمت بإدخاله غير صحيح"
              this.isLoading = false
            }
          },
          error: (err: any) => {
            console.log(err);
            this.errorMessage = err.error.message
            this.isLoading = false
          }
        })
      }

    } else {
      this.resetForm.markAllAsTouched()
    }
  }

  resendEmailVerify() {
    this.resendMessage = ""
    this.isResendEmailLoading = true
    this._AuthService.forgetPassword(this.userEmail).subscribe({
      next: (res) => {
        if(res.success){
          this.isResendEmailLoading = false
          this.resendMessage = "تم إرسال الكود مرة أخرى"
        }
        else{
          this.isResendEmailLoading = false
          this.resendMessage = "فشل إرسال الكود"
        }
      },
      error: (err) => {
        this.isResendEmailLoading = false
        this.resendMessage = err.message
        console.log(err);
      }
    })
  }

  toCode(){
    this._Router.navigate(['/auth/verify-code/' + this.userEmail]);
    console.log(this.userEmail);
  }

}
