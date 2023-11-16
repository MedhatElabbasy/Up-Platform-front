import { Component } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-projects-team-details',
  templateUrl: './projects-team-details.component.html',
  styleUrls: ['./projects-team-details.component.scss']
})
export class ProjectsTeamDetailsComponent {
  teamProjects: any[] = [];
  teamCategories: any[] = [];
  modalId="applyApplication"
  isLoading:boolean=true;
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
  constructor(private _project: ProjectsService , private _model:ModalService , private router: Router , private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.viewTeamProjects();
    this.viewTeamCategories();
  }
  viewTeamProjects() {
    this.isLoading=false
    this._project.getAllTeamProjects().subscribe((res: any) => {
      this.teamProjects = res;
      this.isLoading=true
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
    this.teamProjects.push(item);
  }

  popItem() {
    this.popped.push(this.teamProjects.pop());
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

  viewTeamCategories() {
    this._project.getAllTeamCategories().subscribe((res: any) => {
      this.teamCategories = res;

    });
  }

  applyAppForPart(service_id:string){
    const formData = new FormData();
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    formData.append('user_id', userId);
    formData.append('service_id', service_id);
    this._project.applyServiceApllication(formData).subscribe((res: any) => {
      console.log(res);
      if(res.status == 200) {
        console.log(res.msg);
        this._model.open(this.modalId)
      }
      else{
        console.log(res.msg);
      }
    });

  }

  redirect(id:number){
    this.router.navigate([
      '/projects/projects-team/team-project-info/'+id,
    ]);
  }

  cancel(){
    this._model.close(this.modalId)
    
  }



}
