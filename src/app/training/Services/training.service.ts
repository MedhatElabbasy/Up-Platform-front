import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private _HttpClient: HttpClient) { }

  getAllSkillsLibraryCourses(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/get-all-courses')
  }



  getAllOnlineClasses(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/get-all-classes')
  }


  getAllCategoriesInSkillsLibrary(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/get-sub-categories/skills-library')
  }


  getAllCategoriesInOnlineCourses(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/get-sub-categories/online-courses')
  }

  getAllCoursesBySubCategoryId(subCategoryId: number): Observable<any>{
    return this._HttpClient.get(environment.baseUrl+ '/filter-course?sub_category=' + subCategoryId)
  }
}
