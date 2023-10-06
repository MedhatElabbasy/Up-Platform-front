import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;

  isLoading: boolean = false
  errorMessage: string = ""

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
  ) {

  }


  registerForm: FormGroup = new FormGroup({

    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    phone: new FormControl('', [Validators.required]),

  })

  
  register(registerForm: FormGroup) {
    console.log(registerForm);

    if (registerForm.valid) {
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.register(registerForm.value).subscribe({
          next: (res: any) => {
            // localStorage.setItem(environment.userData, jwt_decode)
            console.log(res);
            localStorage.setItem(environment.localStorageName, res.data.token)
            this._Router.navigate(['/auth/verify-code'])
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
      this.registerForm.markAllAsTouched()
    }
  }

}
