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
}
