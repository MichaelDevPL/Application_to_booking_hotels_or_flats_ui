import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtManagerService } from './jwt-manager.service';
import { ObjectUtils } from '../../util/object.utils';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedToken: string = JwtManagerService.getToken();

    if (ObjectUtils.isDefined(savedToken)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${savedToken}`
        }
      });
    }

    return next.handle(req);
  }
}
