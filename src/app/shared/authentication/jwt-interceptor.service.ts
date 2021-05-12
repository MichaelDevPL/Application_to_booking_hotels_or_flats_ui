import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import { JwtManagerService } from './jwt-manager.service';
import { ObjectUtils } from '../../util/object.utils';
import {SharedDataService} from '../services/shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
    private router: Router,
  ) {
  }

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
