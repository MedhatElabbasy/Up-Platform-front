import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {

  trainingPaths!: any;
  isLoading: boolean = true


  constructor(private _trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.getAllTrainingPaths()
  }

  getAllTrainingPaths() {
    this.isLoading = true
    this._trainingService.getAllTrainingPaths().subscribe((res) => {
      this.isLoading = false
      console.log(res);
      if (res) {
        this.trainingPaths = res.data[0];
        console.log(this.trainingPaths)
      }
    })
  }
}
