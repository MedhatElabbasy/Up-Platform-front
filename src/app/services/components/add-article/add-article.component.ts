import { Component } from '@angular/core';
import { ServicesapiService } from '../../../services/services/servicesapi.service'


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent {
  title: string = '';
  description: string = '';
  image: File | null = null;
  slug: string = '';
  category_id: string = '';

  constructor(public services: ServicesapiService){}

  addArticle() {
    if (!this.image) {
      console.error('Please select an image.');
      return;
    }
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    const imageParts = this.image.name.split("\\");
    const imageName = imageParts[imageParts.length - 1];
    formData.append('image', this.image, imageName);
    formData.append('slug', "slug");
    formData.append('category_id', "2");
      
    console.log('Image Name:', imageName);
  
    this.services.addArticle(formData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
      } else {
        console.log(res.message);
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }
  
  
}
