import { Component } from '@angular/core';
import { ClubService } from 'src/app/club/services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/app/training/Services/training.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  event: any;
  id: any;
  isLoading: boolean = true;

  constructor(
    private ClubService: ClubService,
    private route: ActivatedRoute,
    private TrainingService: TrainingService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getEventDetailsByID();
  }

  getEventDetailsByID() {
    this.spinner.show();
    this.ClubService.getOneEvent(this.id).subscribe((res: any) => {
      this.event = res;
      console.log(this.event);
    });
    this.isLoading = false;
    this.spinner.hide();
  }
  
  addToCart(id:number, type: string) {
    const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
    this.TrainingService.addToCart(id, type).subscribe((res: any) => {
        console.log(res);
        if(res.success) {
          console.log(res.message);
          this.showSuccessToast(res.message);
        }
        else{
          console.log(res.message);
          this.showErrorToast(res.message);
        }
    })
  }

  showSuccessToast(message: string) {
    this.toastr.success("تم إضافة العنصر للسلة بنجاح");
  }
  
  showErrorToast(message: string) {
    this.toastr.error('العنصر موجود بالفعل في السلة');
  }

  navigateToEvents() {
    this._Router.navigate(['club/club-events/'])
  }
}
