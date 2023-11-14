import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects/projects.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-projects-partners',
  templateUrl: './projects-partners.component.html',
  styleUrls: ['./projects-partners.component.scss'],
})
export class ProjectsPartnersComponent {
  parteners!: any;
  isLoading: boolean = true;
  user_id: string = "";
  // part_id: string = "";
  public eventLog: string[] = [];
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
  private popped: any = [];
  constructor(
    private spinner: NgxSpinnerService,
    private ProjectsService: ProjectsService,
    private router: Router,
    private _model:ModalService,
  ) {
    this.getAllParteners();
  }

  getAllParteners() {
    this.parteners = [];
    this.isLoading = true;
    this.ProjectsService.getAllParteners().subscribe((res) => {
      this.parteners = res;
      console.log(this.parteners);
      this.isLoading = false;
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
    this.parteners.push(item);
  }

  popItem() {
    this.popped.push(this.parteners.pop());
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

  applyAppForPart(part_id: string){
    const formData = new FormData();
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    formData.append('user_id', userId);
    formData.append('part_id', part_id);
    this.ProjectsService.applyAppForPart(formData).subscribe((res: any) => {
      console.log(res);
      if(res.status == 200) {
        console.log(res.msg);
        this._model.open("events")
      }
      else{
        console.log(res.msg);
      }
    });
  }

  cancel(){
    this._model.close("events")
  }

  redirect(id:number){
    this.router.navigate([
      '/projects/projects-partners/partners-project-info/'+id,
    ]);
  }
}
