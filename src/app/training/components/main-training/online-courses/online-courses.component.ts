import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from 'src/app/training/Services/training.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.scss']
})
export class OnlineCoursesComponent implements OnInit {
  isLoading: boolean = true;
  courses: any = []
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
  private popped: any = [];
  userDetails: any = {};
  userDetailsString: string = '';
  path=0

  categories: any[] = []
  categoriesCourses!:any;
  constructor(private toastr: ToastrService , private spinner: NgxSpinnerService,private _TrainingService: TrainingService ,private router: Router ,private _auth:AuthServices) {

this.userInfo=localStorage.getItem(environment.localStorageName)

  }

  ngOnInit(): void {
    this.myGetAllCourses();
    this.getAllCategoriesInOnlineCourses() ;
    this.spinner.show();
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      console.log(this.userDetails);
      
      console.log('User Details:', this.userDetails.name);
    } else {
      console.log('User details not found in local storage');
    }
  }

  onPageChange(number: number) {
    this.scaledColumnIndex = null
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.logEvent(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
  }

  pushItem() {
    let item = this.popped.pop() || 'A newly-created meal!';
    this.courses.push(item);
  }

  popItem() {
    this.popped.push(this.courses.pop());
  }

  private logEvent(message: string) {
    this.eventLog.unshift(`${new Date().toISOString()}: ${message}`)
  }


  scaledColumnIndex: number | null = null;

  scaleColumn(colIndex: number): void {
    if (this.scaledColumnIndex === colIndex) {
      // If the clicked column is already scaled, descale it
      this.scaledColumnIndex = null;
    } else {
      // Otherwise, scale the clicked column and descale others
      this.scaledColumnIndex = colIndex;

      // You can apply scaling logic here, e.g., by modifying CSS classes
      // or changing the column width, depending on your design.
    }

    console.log(this.scaledColumnIndex);

  }


  getAllCategoriesInOnlineCourses() {
    this._TrainingService.getAllCategoriesInOnlineCourses().subscribe((res) => {
      console.log(res);
      this.categories = res.data
    })
  }

  
  getAllCoursesBySubCategoryId(categoryId: number) {
    this.isLoading = true
    // this.courses = []
    this.categoriesCourses = []
    this._TrainingService.getAllCoursesBySubCategoryId(categoryId).subscribe((res) => {
      console.log(res);
      if(res){
      this.isLoading = false
      this.categoriesCourses = res.data
     }
    })
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

  myGetAllCourses() {
    this.isLoading = true;
    this._TrainingService.getAllOnlineClasses().subscribe((res) => {
      console.log(res);
      this.courses = res.data
      this.categoriesCourses = res.data
      this.isLoading=false;
    })
  }

  
redirectBio(id:number){
  this.router.navigate(['/biography/',id])
}

redirectCourse(id:number){
  this.router.navigate(['/course-details',id , this.path])
}

addToCart(id:number, type: string) {
  const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
  this._TrainingService.addToCart(id, type).subscribe((res: any) => {
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

redirectToExternalLink(course:any): void {
   let model={
      "key": "YSpkMjFxS5EELVmF",
    "user_id": this.userDetails.id,
    "course_id": course.id,
    "course_category": course.course_category
  }
  console.log(model);
//   let fd = new FormData();
// fd.append("user_id", this.userDetails.id);
// fd.append("course_id", course.id);
// fd.append("course_category", course.course_category);
//   console.log(fd);
  
  //window.location.href = 'https://insrvs.com/login'; // Replace with your external link
  this._TrainingService.redirectTo(model).subscribe((res)=>{
    console.log(res);
    
  })
}



}
