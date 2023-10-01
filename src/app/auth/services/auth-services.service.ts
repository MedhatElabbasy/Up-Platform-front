import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  isAuth = new BehaviorSubject(false)
  constructor() { }
}
