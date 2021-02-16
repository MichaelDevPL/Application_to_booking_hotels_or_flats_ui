import { JwtToken } from './jwt-token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObjectUtils } from '../../util/object.utils';
import { Injectable } from '@angular/core';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtManagerService {

  constructor() {
  }

  public static saveToken(jwtToken: JwtToken): void {
    console.log(jwtToken.token);
    localStorage.setItem('jwtToken', jwtToken.token);
  }

  public static getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public static getExpirationTimeValid(): boolean {
    const helper = new JwtHelperService();
    console.log(helper.getTokenExpirationDate(this.getToken()));
    return !helper.isTokenExpired(this.getToken());
  }

  public static getNickFromToken(): string {
    const helper = new JwtHelperService();
    const token = JwtManagerService.getToken();

    if (ObjectUtils.isDefined(token)) {
      return helper.decodeToken(JwtManagerService.getToken()).sub;
    }
    return null;
  }

  public static getRoleFromToken(): string {
    const helper = new JwtHelperService();
    const token = JwtManagerService.getToken();

    if (ObjectUtils.isDefined(token)) {
      return helper.decodeToken(JwtManagerService.getToken()).role;
    }
    return null;
  }

  public static cleanTokenCache(): void {
    localStorage.removeItem('jwtToken');
  }

}