import { Component } from '@angular/core';
import { ServicesapiService } from '../../services/servicesapi.service';
import { PaginationInstance } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss']
})
export class AdvisorComponent {
  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
    currentPage: 1
  };
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];

  private popped: any = [];
  blogs!:any;
  isLoading:boolean=true;
  userInfo!:any;
constructor(private spinner: NgxSpinnerService,private _services:ServicesapiService,private _ModalService: ModalService){
  this.userInfo=localStorage.getItem(environment.localStorageName)
 
this.getAllBlogs();
}

ngOnInit(): void {
  this.spinner.show();
}

getAllBlogs(){
  this.isLoading=true
  this._services.getAllBlogs().subscribe((res)=>{
    console.log(res);
    
    console.log(res.data);
    this.isLoading=false;
    this.blogs=res.data;
    
  })
}

ngAfterViewInit(): void {
  if(!this.userInfo){
    console.log("llllllll");
   this._ModalService.open('advisor');
 }
 }
 closer(){
  this._ModalService.close('advisor')
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

 

}
