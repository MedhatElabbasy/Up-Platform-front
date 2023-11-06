import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  isLoading: boolean = true;
  cartItems: any = [];
  codeError: string = "";
  codeMsg: string = "";
  couponCode: string = '';
  public eventLog: string[] = [];
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public totalPrice: number = this.calculateTotalPrice();
  public totalAfterCoupon: number = 0;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
    currentPage: 1,
  };
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };

  constructor(
    private _HttpClient: HttpClient,
    private _TrainingService: TrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  onPageChange(number: number) {
    // this.scaledColumnIndex = null
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.logEvent(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
  }
  private logEvent(message: string) {
    this.eventLog.unshift(`${new Date().toISOString()}: ${message}`);
  }

  getAllItems() {
    this.isLoading = true;
    this._TrainingService.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res.data;
      this.isLoading = false;
      this.totalPrice = this.calculateTotalPrice();
      this.totalAfterCoupon = res.total
    });
  }

  removeFromCart(id: number) {
    this._TrainingService.removeFromCart(id).subscribe((res: any) => {
      console.log(res);
      this.getAllItems();
    });
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
  
    if (Array.isArray(this.cartItems)) {
      for (const item of this.cartItems) {
        totalPrice += parseFloat(item.course.price) || 0;
      }
    }
  
    return totalPrice;
  }

  applyCoupon(code: string, coupon: number) {
    this._TrainingService.applyCoupon(code, coupon).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response.success) {
          this.codeError=""
          this.codeMsg="تم تطبيق الخصم بنجاح"
          this.totalAfterCoupon = response.total;
          this.calculateTotalPrice();
          console.log(response);
        } else {
          this.codeError="هذا الكود غير صحيح"
          this.codeMsg=""
          console.error('Failed:', response.message);
        }
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }
  

  redirectBio(id: number) {
    this.router.navigate(['/biography/', id]);
  }

  redirectToPayment() {
    this.router.navigate(['/payment/']);
  }
}
