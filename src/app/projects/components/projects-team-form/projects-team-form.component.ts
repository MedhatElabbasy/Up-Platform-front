import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProjectsService } from '../../projects.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-projects-team-form',
  templateUrl: './projects-team-form.component.html',
  styleUrls: ['./projects-team-form.component.scss']
})
export class ProjectsTeamFormComponent {
  teamForm!:FormGroup
  image: File | null = null;
  categories:[]=[]
  teamID="teamModal"
  userInfo!:any;
  constructor( private router: Router,private fb: FormBuilder,private _project:ProjectsService,
    private _modal:ModalService){
  
    this.generateForm();
    this.getAllCategories();
  }

  generateForm() {
    this.teamForm = this.fb.group({
      free_service_name: [
        '',
        [Validators.required],
      ],
      free_jobtitle: [
        '',
        [Validators.required],
      ],
      free_service_desc: [
        ''
      ],
      free_service_skills: [
        '',
        [Validators.required],
      ],
      service_location: [
        '',
        [Validators.required],
      ],
      service_category: [
        '',
        [Validators.required]
      ],
      service_cost_from: [null, Validators.required],
      service_cost_to: [null, Validators.required],
    });

   
  }

  //get control
  get teamControls(): any {
    return this.teamForm.controls;
  }


  getAllCategories(){
    this._project.getAllTeamCategories().subscribe((res:any)=>{
     this.categories=res;
     console.log(this.categories);
     
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  onSubmit(){
    if (!this.image) {
      console.error('Please select an image.');
      return;
    }
  
    let formTeam = new FormData();
    const userDetailsString = localStorage.getItem('userDetails');
    const userId = userDetailsString ? JSON.parse(userDetailsString)?.id : null;
    formTeam.append('user_id', userId);
    formTeam.append('free_service_name', this.teamForm.controls['free_service_name'].value);
    formTeam.append('free_jobtitle',this.teamForm.controls['free_jobtitle'].value);
    const imageParts = this.image.name.split("\\");
    const imageName = imageParts[imageParts.length - 1];
    formTeam.append('image', this.image, imageName);
    formTeam.append('free_service_desc', this.teamForm.controls['free_service_desc'].value);
    formTeam.append('free_service_skills', this.teamForm.controls['free_service_skills'].value);
    formTeam.append('service_location', this.teamForm.controls['service_location'].value);
    formTeam.append('service_category', this.teamForm.controls['service_category'].value);
    formTeam.append('service_cost_from', this.teamForm.controls['service_cost_from'].value);
    formTeam.append('service_cost_to', this.teamForm.controls['service_cost_to'].value);
    console.log('Image Name:', imageName);
    console.log(formTeam);
  
    this._project.addNewTeamProject(formTeam).subscribe((res: any) => {
      console.log(res);
     this._modal.open(this.teamID)
     this.teamForm.reset();
    });
}

cancel(){
  this._modal.close(this.teamID)
  this.router.navigate(['/projects/projects-team'])
}
}