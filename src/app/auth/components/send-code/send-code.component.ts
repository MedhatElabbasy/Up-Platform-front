import { AuthServices } from './../../services/auth-services.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent {
  errorMessage: string = ""
  isLoading: boolean = false
  constructor(private _AuthServices: AuthServices, private _Router: Router) {

  }

  sendCodeForm: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),

  })


  sendCodeToEmail(sendCodeForm: FormGroup) {
    console.log(sendCodeForm.value);
    this.isLoading = true
    this._AuthServices.forgetPassword(sendCodeForm.value).subscribe((res) => {
      this.isLoading = false
      console.log(res);
      if (res.success) {
        this.errorMessage = "";
        this._Router.navigate(['auth/verify-code/' + sendCodeForm.value.email])
      }
      else{
        this.errorMessage = "لا يوجد حساب لهذا البريد الإلكتروني";
      }
    })
  }


}
