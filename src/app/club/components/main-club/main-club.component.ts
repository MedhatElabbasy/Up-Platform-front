import { Component } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { PaginationInstance } from 'ngx-pagination';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-main-club',
  templateUrl: './main-club.component.html',
  styleUrls: ['./main-club.component.scss']
})
export class MainClubComponent {
  // cities: any[] = [
  //   { label: 'New York', value: 'New York' },
  //   { label: 'London', value: 'London' },
  //   { label: 'Paris', value: 'Paris' },
  //   // Add more options as needed
  // ];
  Allcities=['الكل'];
  cities!:any;
  events!:any;
  isLoading:boolean=true
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


  constructor(private _club:ClubService){
this.getAllEvents();
  }


   get city(): any {
    return this.cityForm.get('cities');
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllLocations();
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
    const locationObject={ location:city}
    this._club.getAllLocationEvents(locationObject).subscribe((res)=>{
       console.log(res);
       this.events=res
    })
  }
}
