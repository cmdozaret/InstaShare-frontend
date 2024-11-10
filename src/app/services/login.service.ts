import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authCls } from '../models/class/auth';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/interfaces/api-response';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constants/constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  login(authObj: authCls): Observable<APIResponse> {
    return this.http.post(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.AUTH_ROUTES.LOGIN}`, authObj) as Observable<APIResponse>;
  }

  logout() {
    return this.http.delete(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.AUTH_ROUTES.LOGOUT}`) as Observable<APIResponse>;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(environment.LOCAL_STORAGE_TKN) !== null;
  }

  getUserLoggedProperty(propertyName: string) {
    let loggedUser = localStorage.getItem(`${environment.PROYECT_NAME}_loggedUser`);
    if (loggedUser) {
      const res = JSON.parse(loggedUser);
      return res[propertyName];
    }
  }

  deleteUser(id: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.USER_ROUTES.DELETE}/${id}`) as Observable<APIResponse>;
  }
}
