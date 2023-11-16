import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectsService } from 'src/app/projects/projects.service';

@Component({
  selector: 'app-projects-chance',
  templateUrl: './projects-chance.component.html',
  styleUrls: ['./projects-chance.component.scss']
})
export class ProjectsChanceComponent {
  projects!: any;
  categories!: any;
  allCategories = ['الكل'];
  isLoading:boolean=true
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
 
  constructor(private service: ProjectsService, private router: Router,private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.getAllOpps();
    this.getAllOppsCategories();
  }

  navigate(id: any) {
    this.router.navigate([
      '/projects/projects-chance/chance-project-info/' + id,
    ]);
    console.log(id);
  }
  getAllOpps() {
    this.isLoading=false
    this.service.getAllOpps().subscribe((res) => {
      if(res){
      this.projects = res;
      this.isLoading=true
      }
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
    this.projects.push(item);
  }

  popItem() {
    this.popped.push(this.projects.pop());
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


  getAllOppsCategories() {
    this.service.getAllOppsCategories().subscribe((res) => {
      this.categories = res;

      this.categories.forEach((ele: any) => {
        this.allCategories.push(ele.opp_cat_name);
      });
    });
  }

}