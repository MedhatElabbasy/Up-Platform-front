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

  sendPointsData(data: any, id: number){
    return this._HttpClient.post(environment.baseUrl + '/projects/'+ id +'/points', data)
  }
}