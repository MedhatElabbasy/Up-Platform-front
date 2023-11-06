import { Component, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { TrainingService } from 'src/app/training/Services/training.service';

@Component({
  selector: 'app-all-skills-library',
  templateUrl: './all-skills-library.component.html',
  styleUrls: ['./all-skills-library.component.scss']
})
export class AllSkillsLibraryComponent {
  courses: any[] = []

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
  categories: any[] = []
  isLoading: boolean = true
   categoriesCourses!:any;
  constructor(private _AuthServices: AuthServices, private _TrainingService: TrainingService) {
    // _AuthServices.isUserLoggedIn.next(false)
  }

  ngOnInit(): void {
    this.getAllCourses()
    this.getAllCategoriesInSkillsLibrary()
  }


  getAllCourses() {
    this.isLoading = true
    this._TrainingService.getAllSkillsLibraryCourses().subscribe((res) => {
      console.log(res);
      this.categoriesCourses = res.data
      this.courses = res.data
      this.isLoading = false

    })
  }

  myGetAllCourses(){
    this.categoriesCourses = this.courses
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


  getAllCategoriesInSkillsLibrary() {
    this._TrainingService.getAllCategoriesInSkillsLibrary().subscribe((res) => {
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
      this.categoriesCourses = res
     }
    })
  }
  addToCart(id:number, type: string) {
    const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
    this._TrainingService.addToCart(id, type).subscribe((res: any) => {
        console.log(res);
        const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
        if(res.success) {
          cartBtn.innerText = 'تمت الإضافة للسلة';
          cartBtn.disabled = true;
        }
        else{
          cartBtn.innerText = 'مضاف بالفعل للسلة'; 
          cartBtn.disabled = true;
        }
    })
  }


}

