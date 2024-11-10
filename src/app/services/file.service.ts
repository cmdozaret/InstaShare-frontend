import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/interfaces/api-response';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  http = inject(HttpClient);


  constructor() { }

  getFiles(userId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.FILE_ROUTES.LIST}`);
  }

  uploadFile(file: any): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.FILE_ROUTES.UPLOAD}`, file);
  }

  deleteFile(id: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.FILE_ROUTES.DELETE}/${id}`);
  }

  downloadFile(id: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}:${environment.API_PORT}/${Constant.API_ROUTES.FILE_ROUTES.DOWNLOAD}/${id}`, {
      responseType: 'blob' as 'json' // Important for binary data
    });
  }
}
