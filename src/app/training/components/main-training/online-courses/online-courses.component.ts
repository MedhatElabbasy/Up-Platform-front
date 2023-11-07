import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from 'src/app/training/Services/training.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.scss']
})
export class OnlineCoursesComponent implements OnInit {
  isLoading: boolean = true;
  zoomCourses: any = []
  userInfo!:any;
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
  constructor(private spinner: NgxSpinnerService,private _TrainingService: TrainingService ,private router: Router ,private _auth:AuthServices) {

this.userInfo=localStorage.getItem(environment.localStorageName)
//console.log(this.userInfo);
  }

  ngOnInit(): void {
    this.getAllCourses()
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

  
  // scaledColumnIndex: number | null = null;

  // scaleColumn(colIndex: number): void {
  //   if (this.scaledColumnIndex === colIndex) {
  //     // If the clicked column is already scaled, descale it
  //     this.scaledColumnIndex = null;
  //   } else {
  //     // Otherwise, scale the clicked column and descale others
  //     this.scaledColumnIndex = colIndex;

  //     // You can apply scaling logic here, e.g., by modifying CSS classes
  //     // or changing the column width, depending on your design.
  //   }

  //   console.log(this.scaledColumnIndex);

  // }

  getAllCourses() {
    this.isLoading = true;
    this._TrainingService.getAllOnlineClasses().subscribe((res) => {
      console.log(res);
      this.zoomCourses = res.data
      this.isLoading=false;
    })
  }

  
redirectBio(id:number){
  this.router.navigate(['/biography/',id])
}

redirectCourse(id:number){
  this.router.navigate(['/course-details',id])
}
}
