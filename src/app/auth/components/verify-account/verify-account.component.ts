import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {
  userDetails: any = {};
  userDetailsString: string = '';
  isLoading: boolean = false
  isResendMessageLoading: boolean = false
  errorMessage: string = ""
  resendMessage: string = ""
  userPhone: string = ""

  constructor(
    private _AuthService: AuthServices,
    private _Router: Router,
    private _ActivatedRoute:ActivatedRoute
  ) {
    //  _ActivatedRoute.params.subscribe((res) => {
    //    this.userPhone = res['phone']
    //  })
  }

  verifyAccountForm: FormGroup = new FormGroup({
    otp: new FormControl('', [Validators.required]),
    //phone: new FormControl('', [Validators.required]),
  })

  verifyCode(verifyAccountForm: any) {
    console.log(verifyAccountForm.value);

    if (this.userPhone) {
      this.verifyAccountForm.patchValue({
        phone: this.userPhone,
        //otp: this.otp
      })
      if (verifyAccountForm.valid) {
        this.errorMessage = ""
        if (!this.isLoading) {
          this.isLoading = true
              this._Router.navigate(['/'])
              this.isLoading = false
        }
  
      } else {
        this.verifyAccountForm.markAllAsTouched()
      }
    }
    else {
      
      this.verifyAccountForm.patchValue({
        phone: ''
      })
      if (verifyAccountForm.valid) {
        this.errorMessage = ""
        if (!this.isLoading) {
          this.isLoading = true
          this._AuthService.phoneVerify(verifyAccountForm.value).subscribe({
            next: (res: any) => {
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
        this.verifyAccountForm.markAllAsTouched()
      }
    }
  }

  resendPhoneVerify() {
    this.resendMessage = ""
    this.isResendMessageLoading = true
    this._AuthService.sendPhoneCode(this.userPhone).subscribe({
      next: (res) => {
        console.log(res);
        if(res.success){
          this.isResendMessageLoading = false
          this.resendMessage = "تم إرسال الكود مرة أخرى"
        }
        else{
          this.isResendMessageLoading = false
          console.log(this.userPhone)
          this.resendMessage = "فشل إرسال الكود"
        }
      },
      error: (err) => {
        this.isResendMessageLoading = false
        this.resendMessage = err.message
        console.log(err);
      }
    })
  }

  ngOnInit() {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      console.log('User Details:', this.userDetails.name);
    } else {
      console.log('User details not found in local storage');
    }
  }
  }

  // getUserDetails() {
  //   this._AuthService.profile().subscribe(
  //     (data: any) => {
  //       this.userPhone = data.data.phone;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user details', error);
  //     }
  //   );
  // }