import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

  getAllOnlineCourseDetailsByID(course_id:number){
    return this._HttpClient.get(environment.baseUrl + '/get-class-details/'+course_id);
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

  private cartItemCount = new BehaviorSubject<number>(0);

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  updateCartItemCount(count: number) {
    this.cartItemCount.next(count);
  }

  addToCart(id: number, type: string): Observable<any> {
    const data = {
      type: type,
    };
  
    return this._HttpClient.post(environment.baseUrl + '/add-to-cart/' + id, data, {
      headers: {
        ApiKey: environment.ApiKey
      }
    }).pipe(
      map((response: any) => {
        this.updateCartItemCount(response.count);
        return response;
      })
    );
  }
  

   removeFromCart(id: number): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/remove-to-cart/' + id, {
      headers: {
        ApiKey: environment.ApiKey
      }
    }).pipe(
      map((response: any) => {
        this.updateCartItemCount(response.count);
        return response;
      })
    );
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
   return this._HttpClient.post(environment.baseUrl + '/redirect-to-continue-course' , model)
  }

  getQuestions(): Observable<any>{
    return this._HttpClient.get(environment.baseUrl + '/suggested-path-test')
  }

  startTest(): Observable<any>{
    return this._HttpClient.get(environment.baseUrl + '/suggested-path-test/start')
  }

  submitResults(model:object){
    return this._HttpClient.post(environment.baseUrl + '/suggested-path-test' , model)
  }

  getResultOfTest(): Observable<any>{
    return this._HttpClient.get(environment.baseUrl + '/suggested-path-test/result')
  }

}
