import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feasibility-study-final',
  templateUrl: './feasibility-study-final.component.html',
  styleUrls: ['./feasibility-study-final.component.scss']
})
export class FeasibilityStudyFinalComponent {
  project_id!: string | null;

  constructor(private _Router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.project_id = params.get('project_id'); 
      console.log(this.project_id);
    });
  }

  next() {
    this._Router.navigate(['/projects/purchases/'+this.project_id]);
  }
}
