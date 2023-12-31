import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllOpps(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/opportunity/index')
  }

  getAllParteners(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/part/index')
  }

  getAllOppsCategories(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/opp_category/index')
  }

  newPartener(formData: FormData){
    return this._HttpClient.post(environment.baseUrl + '/part/store', formData,{
      headers: {
        ApiKey: environment.ApiKey
      }
    }
  )}

  applyAppForPart(formData: FormData){
    return this._HttpClient.post(environment.baseUrl + '/part_app/store', formData,{
      headers: {
        ApiKey: environment.ApiKey
      }
    }
  )}

  getProjectFinancingData(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/fund_agency/index')
  }

  getAllFinancingCategory(): Observable<any> {
    return this._HttpClient.get(environment.baseUrl + '/fund_cat/index')
  }

  getAllTeamCategories(){
    return this._HttpClient.get(environment.baseUrl + '/service_category/index')
  }


  addNewTeamProject(formData: FormData){
    return this._HttpClient.post(environment.baseUrl + '/freelance_services/store', formData)
  }

  getAllTeamProjects(): Observable<any>{
    return this._HttpClient.get(environment.baseUrl + '/freelance_services/index')
  }


  applyServiceApllication(formData: FormData){
    return this._HttpClient.post(environment.baseUrl + '/service_applications/store', formData)
  }

  getAllCategoriesForProjects(){
    return this._HttpClient.get(environment.baseUrl + '/projects/categories')
  }

  getDetailsOfCategory(id:number){
    return this._HttpClient.get(environment.baseUrl + '/projects/categories/'+ id)
  }

  getAllLessons(model:object){
    return this._HttpClient.get(environment.baseUrl + '/projects/lessons',model)
  }

  getLessonDetails(id:number){
    return this._HttpClient.get(environment.baseUrl + '/projects/lessons/'+ id)
  }

  AllProject(){
    return this._HttpClient.get(environment.baseUrl + '/projects')
  }

  sendDataForProject(model:object){
    return this._HttpClient.post(environment.baseUrl + '/projects/12/case-study-notes',model)
  }
  sendPointsData(data:object, project_id:string|null){
    return this._HttpClient.post(environment.baseUrl + '/projects/'+project_id+'/points',data)
  }
  
  sendFeasibilityStudyForm(data:object, project_id:string|null){
    return this._HttpClient.post(environment.baseUrl + '/projects/'+project_id+'/case-study',data)
  }

  newProductForProject(data:object, project_id:string|null){
    return this._HttpClient.post(environment.baseUrl + '/projects/markting/products/'+project_id,data)
  }

  addProject(data:object){
    return this._HttpClient.post(environment.baseUrl + '/projects',data)
  }

  addPurchas(data:object, project_id:string|null){
    return this._HttpClient.post(environment.baseUrl + '/projects/purchases/'+project_id ,data)
  }
}
