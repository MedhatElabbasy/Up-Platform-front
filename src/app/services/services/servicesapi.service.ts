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

  addArticle(model:FormData){
    return this._HttpClient.post(environment.baseUrl + '/blogs/store' , model)
  }

  getAllconsultants():Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/all-consultants')
  }

  getAllCategories(){ 
    return this._HttpClient.get(environment.baseUrl + '/blogs/categories')
  }

  getAllComments(blogId:number){
    return this._HttpClient.get(environment.baseUrl + `/blogs/${blogId}/allComments-blog`)
  }


  addNewComment(blogId:number ,fd:FormData){
    return this._HttpClient.post(environment.baseUrl + `/blogs/${blogId}/comments` , fd)
  }

  addTextConsultation(model:any){
    return this._HttpClient.post(environment.baseUrl + '/consultant-message-request' , model)
  }

  addOnlineConsultation(model:any){
    return this._HttpClient.post(environment.baseUrl + '/consultant-appointment-request' , model)
  }

}
