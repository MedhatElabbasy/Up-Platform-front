import { Component } from '@angular/core';
import { TrainingService } from '../../Services/training.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent {
  isLoading: boolean = true
  trainingPaths:any = [];
  constructor(private _trainingService:TrainingService, private toastr: ToastrService){

  }

  ngOnInit(): void {
  this.getAllTrainingPaths()
  }

  getAllTrainingPaths(){
    this.isLoading = true
    this._trainingService.getAllTrainingPaths().subscribe((res)=>{
      console.log(res);
      if(res){
      this.trainingPaths=res.data;
      this._trainingService.bundleSubscription.next(this.trainingPaths);
      this.isLoading=false;
      }
    })
  }

  addToCart(id:number, type: string) {
    this._trainingService.addToCart(id, type).subscribe((res: any) => {
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

}
