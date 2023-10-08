import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string = ""
  userEmail: string = ""
  code: string = ""

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _ActivatedRoute.params.subscribe((res) => {
      this.userEmail = res['email']
      this.code = res['code']
    })
  }

  resetForm: FormGroup = new FormGroup({

    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required]),

  })


  reset(resetForm: FormGroup) {
    console.log(resetForm);
    this.resetForm.patchValue({
      email: this.userEmail,
      code: this.code
    })

    if (this.resetForm.valid) {
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.resetPassword(this.resetForm.value).subscribe({
          next: (res: any) => {
            // localStorage.setItem(environment.userData, jwt_decode)
            console.log(res);
            
            
            this._Router.navigate(['/auth/success'])
            this.isLoading = false
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

}
