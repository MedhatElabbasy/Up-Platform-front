import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesapiService } from '../../services/servicesapi.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent {
  isFormSubmitted = false;
  addBlogForm!: FormGroup;
  categories:[]=[]
  profileImage!: string | null;
  message: string = '';
  imageIsLoading: boolean = false;
  image: File | null = null;
  articleID="article";
  validationMessages = {
    title: {
      required: 'عنوان المقال مطلوب'
    },
    description: {
      required: ' وصف المقال مطلوب',
    },
    image: {
      required: 'الصورة مطلوبة',
    },
    authored_date: {
      required: 'تاريخ النشر مطلوب'
    },
    authored_time: {
      required: 'وقت النشر مطلوب'
    },
    category_id: {
      required: ' الفئة مطلوبة'
    },
    slug: {
      required: 'العنوان المختصر مطلوب',
    },
  };

  constructor( private router: Router,private _domSanitizer: DomSanitizer,private fb: FormBuilder,private _service:ServicesapiService,
    private _modal:ModalService){
    this.generateForm();
    this.getAllCategories();
  }

  generateForm() {
    this.addBlogForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      authored_date: ['', [Validators.required]],
      authored_time: ['', [Validators.required]],
      category_id: [null, Validators.required],
    });

  }

  //get control
  get blogsControls(): any {
    return this.addBlogForm.controls;
  }


  getAllCategories(){
    this._service.getAllCategories().subscribe((res:any)=>{
     this.categories=res;
     console.log(this.categories);
     
    })
  }


  addArticle() {
    this.isFormSubmitted = true;
    console.log(this.addBlogForm);
    
    if (!this.image) {
      console.error('Please select an image.');
      return;
    }
  
    let formBlog = new FormData();
    formBlog.append('title', this.addBlogForm.controls['title'].value);
    formBlog.append('description',this.addBlogForm.controls['description'].value);
    const imageParts = this.image.name.split("\\");
    const imageName = imageParts[imageParts.length - 1];
    formBlog.append('image', this.image, imageName);
    formBlog.append('authored_date', this.addBlogForm.controls['authored_date'].value);
    formBlog.append('authored_time', this.addBlogForm.controls['authored_time'].value);
    formBlog.append('slug', this.addBlogForm.controls['slug'].value);
    formBlog.append('category_id', this.addBlogForm.controls['category_id'].value);
    
    console.log('Image Name:', imageName);
    console.log(formBlog);
  
    this._service.addArticle(formBlog).subscribe((res: any) => {
      console.log(res);
     this._modal.open(this.articleID)
     this.addBlogForm.reset();
    });
  }

  close(){
    this._modal.close(this.articleID);
   this.router.navigate(['/services/advisor'])
  }


  category(event:any){
    console.log(event);
    
  }

  
  // onImageUpload(event: any) {
  //   let arr = event?.addedFiles[0]?.name.split('.');
  //   const extension = arr[arr.length - 1].toLowerCase();
  //   if (!AcceptedExtension.includes(extension)) {
  //     (this.blogsControls['photoId'] as FormControl).setErrors({
  //       notValid: true,
  //     });
  //     this.message = 'Only images are supported.';
  //     // this.profileImage = null;
  //     return;
  //   } else {
  //     //let url = URL.createObjectURL(event.target.files[0]);
  //     (this.blogsControls['photoId'] as FormControl).setErrors({
  //       notValid: null,
  //     });
  //     this.message = '';
  //     this.uploadFile(event.addedFiles[0].name, event.addedFiles[0]);
  //     // .subscribe((res) => {
  //     //   this.profileImage = url;
  //     //   this.notificationsControls['photoId'].setValue(res);
  //     // });
  //   }
  // }

  // uploadFile(name: string, file: File) {
  //   //console.log(file);
  //   let url = `api/Attachment/uploadFormFile`;
  //   let imgSize = environment.imgSize;
  //   let fileSize = file.size;
  //   if (fileSize <= imgSize) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     //console.log(formData, url);
  //     this.imageIsLoading = true;
  //     // this.global.addData(url, formData).subscribe((res) => {
  //     //   this.imageIsLoading = false;

  //     //   //console.log(res);

  //     //   this.profileImage = URL.createObjectURL(file);
  //     //   //console.log(this.profileImage);

  //     //   this.blogsControls['photoId'].setValue(res);
  //     // });
  //   } else {
  //     this.message = 'Max image size that you can upload it is 5 Megabyte';
  //     //this.global.addData(url, {});
  //   }
  // }

  // sanitize(url: string) {
  //   return this._domSanitizer.bypassSecurityTrustUrl(url);
  // }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }


}
