import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesapiService {

  constructor(private _HttpClient: HttpClient) { }

  getAllBlogs(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/blogs')
  }

  getAllQuizes():Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/get-all-quizzes/for-my_exams')
  }

  addArticle(title:string, description:string, image:string, slug:string, category_id: string){
    const data = {
      title: title,
      description: description,
      image: image,
      slug: slug,
      category_id: category_id
    };
    return this._HttpClient.post(environment.baseUrl + '/blogs/store', data,{
      headers: {
        ApiKey: environment.ApiKey
      }
    }
    )}

  
}
