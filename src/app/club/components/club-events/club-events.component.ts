
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { ClubService } from '../../services/club.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-club-events',
  templateUrl: './club-events.component.html',
  styleUrls: ['./club-events.component.scss']
})
export class ClubEventsComponent {
  Allcities=['الكل'];
  cities!:any;
  events!:any;
  isLoading:boolean=true
  userDetails: any = {};
  userDetailsString: string = '';
  selectedCity: string = ''; // Initialize with a default value if needed
  public eventLog: string[] = [];
  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 4,
    currentPage: 1
  };
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };


  cityForm = new FormGroup({
    cities: new FormControl(null, [Validators.required]),
  });


  constructor(private spinner: NgxSpinnerService,private _club:ClubService ,private TrainingService: TrainingService, private toastr: ToastrService, private _Router: Router){
    this.getAllEvents();
  }


   get city(): any {
    return this.cityForm.get('cities');
  }

  ngOnInit(): void {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString != null) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      const user_id = this.userDetails.id;
      this.getEventsByID(user_id);
    } else {
      console.log('User details not found in local storage');
    }
    
    this.getAllEvents();
    this.getAllLocations();
    this.spinner.show();
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
     this.eventLog.unshift(`${new Date().toISOString()}: ${message}`)
   }

   citiesFilteration(event: any){
   this.selectedCity=event.value;
   console.log(this.selectedCity);
   if(this.selectedCity=='الكل'){
    this.getAllEvents();
   }else{
    this.getAllEventsByLocations(this.selectedCity)
   }
   }

  getAllEvents(){
    this.events=[]
    this.isLoading=true
    this._club.getAllEvents().subscribe((res)=>{
      console.log(res);
      this.events=res
      this.isLoading=false
    })
  }

  getAllLocations(){
    this._club.getAllLocations().subscribe((res)=>{
      console.log(res);
      this.cities=res;
      this.cities.forEach((ele:any)=>{
        this.Allcities.push(ele)
      })
      console.log(this.Allcities);
      
    })
  }

  getAllEventsByLocations(city:string){
    this.events=[]
    this.isLoading=true;
    const locationObject={ location:city}
    this._club.getAllLocationEvents(city).subscribe((res)=>{
       console.log(res);
       this.isLoading=false
       this.events=res
    })
  }

  getEventsByID(user_id:number){
    this._club.getEventsByID(user_id).subscribe((res)=>{
       console.log(res);
    })
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

  navigateToEventDetails(id: number) {
    this._Router.navigate(['club/club-events/' + id])
  }
}