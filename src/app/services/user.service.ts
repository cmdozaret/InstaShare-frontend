import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/class/user';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/interfaces/api-response';
import { Constant } from '../constants/constant';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  constructor() { }

  createUser(user: User): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.USER_ROUTES.LIST}`, user);
  }

  deleteUser(id: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.USER_ROUTES.DELETE}/${id}`);
  }
}
