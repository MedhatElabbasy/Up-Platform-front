import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {

  trainingPaths!: any;
  isLoading: boolean = true
  id!:number;
  path!:any;
  constructor( private router: Router ,private route: ActivatedRoute ,private _trainingService: TrainingService){
    this.route.params.subscribe((res:any) => {
      console.log(res)
      this.id=res.id
    });
  }

 

  ngOnInit(): void {
    this.getAllTrainingPaths()
  }

  getAllTrainingPaths() {
    this.isLoading = true
    this._trainingService.getAllTrainingPaths().subscribe((res) => {
      console.log(res);
      if (res) {
        this.trainingPaths = res.data;
        console.log(this.trainingPaths);
        this.isLoading = false
       this.trainingPaths.forEach((ele:any)=>{
        if(ele.id == this.id){
          console.log(ele);
          this.path=ele;
        }
       })
      }
    });
  }

  start(){
    this.router.navigate(['/training/course',this.id])
  }
}
