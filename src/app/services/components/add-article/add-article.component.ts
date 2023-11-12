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
  image: string = '';
  slug: string = '';
  category_id: string = '';

  constructor(public services: ServicesapiService){}

  addArticle() {
    const imageParts = this.image.split("\\");
    const imageName = imageParts[imageParts.length - 1];
    console.log('Image Name:', imageName);
  
    this.services.addArticle(this.title, this.description, imageName, this.slug, this.category_id).subscribe((res: any) => {
        console.log(res);
        if(res.success) {
          console.log(res.message);
        }
        else{
          console.log(res.message);
        }
    });
  }
  
}
