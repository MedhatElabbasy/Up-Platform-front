import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
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

  validationMessages = {
    name: {
      required: 'اسم المستخدم مطلوب'
    },
    email: {
      required: 'البريد الإلكتروني مطلوب',
      email: 'البريد الإلكتروني غير صحيح'
    },
    password: {
      required: 'كلمة المرور مطلوبة',
      pattern: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وأرقام ورموز خاصة'
    },
    password_confirmation: {
      required: 'يرجى تأكيد كلمة المرور'
    },
    phone: {
      required: 'رقم الجوال مطلوب'
    }
  };

  

  passwordConfirmationValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  checkboxValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const checkbox = control.get('checkboxControl');
    return checkbox?.value === true ? null : { required: true };
  };

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
  ) {

  }


  registerForm: FormGroup = new FormGroup({

    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]),
    password_confirmation: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    checkboxControl: new FormControl(false),
  }, { validators: [this.passwordConfirmationValidator, this.checkboxValidator] });

  
  register(registerForm: FormGroup) {
    console.log(registerForm);

    if (registerForm.valid) {
      if (registerForm.get('checkboxControl')?.value !== true) {
        console.log("no")
        this.errorMessage = "يجب الموافقة على الشروط والأحكام";
      } else{
        console.log("yes")
      this.errorMessage = ""
      if (!this.isLoading) {
        this.isLoading = true
        this._AuthService.register(registerForm.value).subscribe({
          next: (res: any) => {
        console.log(res);

            // localStorage.setItem(environment.userData, jwt_decode)
            if(res.success) {
              // localStorage.setItem(environment.localStorageName, res.data.token)
              localStorage.setItem(environment.localStorageName, environment.ApiKey)
              this._Router.navigate(['/'])
              this.isLoading = false
          } else {
            this.isLoading = false;
            if (res.email && res.email.length > 0) {
              this.errorMessage = "البريد الإلكتروني مُستخدم من قبل";
            }
            else{
              this.errorMessage = "رقم الهاتف مستخدم من قبل"
            }
          }
          },
          error: (err: any) => {
            console.log(err);
            this.errorMessage = err.error.message
            this.isLoading = false
          }
        })
      }

    } }else {
      this.registerForm.markAllAsTouched()
    }
  }

}
