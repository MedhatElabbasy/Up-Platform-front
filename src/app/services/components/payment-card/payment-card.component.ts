import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent implements OnInit {
  credit: number = 0;
  totalAfterCoupon: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _Router: Router,
    private PaymentService: PaymentService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.totalAfterCoupon = params['totalAfterCoupon'];
    });
  }

  ngOnInit(): void {
    this.getWalletCredit();
  }

  getWalletCredit() {
    this.PaymentService.getWalletCredit().subscribe((res: any) => {
      console.log(res);
      this.credit = res.sr;
    });
  }

  navigateToCardPayment(){
    this._Router.navigate(['/card-payment']);
  }

  navigateToCart(){
    this._Router.navigate(['/cart']);
  }
}
