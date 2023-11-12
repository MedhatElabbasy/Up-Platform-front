import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AcceptedExtension } from 'src/app/core/data/accepted_extension';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  addBlogForm!: FormGroup;
  categories!:any;
  profileImage!: string | null;
  message: string = '';
  imageIsLoading: boolean = false;

  constructor( private router: Router,private _domSanitizer: DomSanitizer,private fb: FormBuilder,private _service:ServicesapiService){}

  generateForm() {
    this.addBlogForm = this.fb.group({
      title: [
        '',
        [Validators.required],
      ],
      description: [
        '',
        [Validators.required],
      ],
      image: [
        '',
        [Validators.required],
      ],
      slug: [
        '',
        [Validators.required],
      ],
      authored_date: [
        '',
        [Validators.required],
      ],
      authored_time: [
        '',
        [Validators.required]
      ],
      category_id: [null, Validators.required],
     
    });
  }

  //get control
  get blogsControls(): any {
    return this.addBlogForm.controls;
  }


  getAllCategories(){
    this._service.getAllCategories().subscribe((res:any)=>{
     this.categories=res.data;
     console.log(this.categories);
     
    })
  }


  
  onImageUpload(event: any) {
    let arr = event?.addedFiles[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();
    if (!AcceptedExtension.includes(extension)) {
      (this.blogsControls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.message = 'Only images are supported.';
      // this.profileImage = null;
      return;
    } else {
      //let url = URL.createObjectURL(event.target.files[0]);
      (this.blogsControls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      this.message = '';
      this.uploadFile(event.addedFiles[0].name, event.addedFiles[0]);
      // .subscribe((res) => {
      //   this.profileImage = url;
      //   this.notificationsControls['photoId'].setValue(res);
      // });
    }
  }

  uploadFile(name: string, file: File) {
    //console.log(file);
    let url = `api/Attachment/uploadFormFile`;
    let imgSize = environment.imgSize;
    let fileSize = file.size;
    if (fileSize <= imgSize) {
      const formData = new FormData();
      formData.append('file', file);
      //console.log(formData, url);
      this.imageIsLoading = true;
      // this.global.addData(url, formData).subscribe((res) => {
      //   this.imageIsLoading = false;

      //   //console.log(res);

      //   this.profileImage = URL.createObjectURL(file);
      //   //console.log(this.profileImage);

      //   this.blogsControls['photoId'].setValue(res);
      // });
    } else {
      this.message = 'Max image size that you can upload it is 5 Megabyte';
      //this.global.addData(url, {});
    }
  }

  sanitize(url: string) {
    return this._domSanitizer.bypassSecurityTrustUrl(url);
  }
}
