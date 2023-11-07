import { Component } from '@angular/core';
import { ServicesapiService } from '../../services/servicesapi.service';
import { PaginationInstance } from 'ngx-pagination';

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
constructor(private _services:ServicesapiService){
this.getAllBlogs();
}

getAllBlogs(){
  this._services.getAllBlogs().subscribe((res)=>{
    console.log(res);
    
    console.log(res.data);
    this.blogs=res.data;
    
  })
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
