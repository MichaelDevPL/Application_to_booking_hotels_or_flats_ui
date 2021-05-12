import { JwtToken } from './jwt-token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ObjectUtils } from '../../util/object.utils';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtManagerService {

  constructor() {
  }

  public static saveToken(jwtToken: JwtToken): void {
    localStorage.setItem('jwtToken', jwtToken.token);
  }

  public static getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public static getExpirationTimeValid(): boolean {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.getToken());
  }

  public static allowToRefreshToken(): boolean {
    const helper = new JwtHelperService();
    const remainTimeToExpiration = helper.getTokenExpirationDate(this.getToken()).getTime() - new Date().getTime();

    return  0 < remainTimeToExpiration && remainTimeToExpiration < 300000; // 5min before expiration
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
    localStorage.clear();
  }
}
