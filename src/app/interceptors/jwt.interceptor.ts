import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenObj = localStorage.getItem(environment.LOCAL_STORAGE_TKN);
  if (tokenObj) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenObj}`
      }
    });
    return next(cloneReq);
  }
  else {
    return next(req);
  }
};
