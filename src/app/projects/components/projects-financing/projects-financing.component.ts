import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-projects-financing',
  templateUrl: './projects-financing.component.html',
  styleUrls: ['./projects-financing.component.scss']
})
export class ProjectsFinancingComponent {
  financingProjects: any[] = [];
  categories: any[] = [];
  isLoading:boolean=true
  allCate: any[] = ['الكل'];
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
 
  constructor(private service: ProjectsService, private router: Router , private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.viewProjectsFinancing();
    this.viewCategoriesFinancing();
  }
  // View financing projects
  viewProjectsFinancing() {
    this.isLoading=false
    this.service.getProjectFinancingData().subscribe(
      (res: any) => {
        this.financingProjects = res;
        this.isLoading=true;
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  navigate(id: any) {
    this.router.navigate([
      '/projects/projects-financing/financing-project-info/'+id,
    ]);
    console.log(id);
  }
  // handle financing projects categories
  viewCategoriesFinancing() {
    this.service.getAllFinancingCategory().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
      this.categories.forEach((ele: any) => {
        this.allCate.push(ele.fund_categories_name);
      });
    });
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
    this.financingProjects.push(item);
  }

  popItem() {
    this.popped.push(this.financingProjects.pop());
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

}
