import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const totalAfterCoupon = params['totalAfterCoupon'];
      // Use totalAfterCoupon in the component without displaying it in the URL
    });
  }

}