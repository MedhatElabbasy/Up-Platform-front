import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  bundleSubscription = new BehaviorSubject(null);

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

  getAllTrainingPaths(): Observable<any>{
    return this._HttpClient.get(environment.baseUrl + '/bundle-subscription')
  }

  getUserData(user_id:number){
    return this._HttpClient.get(environment.baseUrl + '/user/'+user_id);
  }

  getAllCourseDetailsByID(course_id:number){
    return this._HttpClient.get(environment.baseUrl + '/get-course-details/'+course_id);
  }

  getCartItems(){
    return this._HttpClient.get(environment.baseUrl + '/cart-list', {
      headers: {
        ApiKey: environment.ApiKey
      }
    });
  }

  // addToCart(id:number){
  //   return this._HttpClient.get(environment.baseUrl + '/add-to-cart/'+id, {
  //     headers: {
  //       ApiKey: environment.ApiKey
  //     }
  //   });
  // }

   addToCart(id:number, type:string){
     const data = {
       type: type,
     };
     return this._HttpClient.post(environment.baseUrl + '/add-to-cart/'+id, data, {
       headers: {
         ApiKey: environment.ApiKey
       }
     });
   }

  removeFromCart(id:number){
    return this._HttpClient.get(environment.baseUrl + '/remove-to-cart/'+id, {
      headers: {
        ApiKey: environment.ApiKey
      }
    });
  }

  applyCoupon(code: string, total: number){
    const data = {
      code: code,
      total: total
    };
    return this._HttpClient.post(environment.baseUrl + '/apply-coupon', data , {
      headers: {
        ApiKey: environment.ApiKey
      }
    });
  }

  redirectTo(model:object){
   return this._HttpClient.post(environment.baseUrl + 'redirect-to-continue-course' , model)
  }
}
