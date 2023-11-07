import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  credit: number = 0;
  totalAfterCoupon: number = 0;

  constructor(
    private route: ActivatedRoute,
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
}
