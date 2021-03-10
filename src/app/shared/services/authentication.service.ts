import {HostListener, Injectable, OnDestroy} from '@angular/core';
import { HttpCustomService } from '../../util/http-custom.service';
import { LoginData } from '../models/user/login.model';
import {NavigationEnd, Router} from '@angular/router';
import { SharedDataService } from './shared-data.service';
import { map } from 'rxjs/operators';
import { JwtToken } from '../authentication/jwt-token.model';
import { JwtManagerService } from '../authentication/jwt-manager.service';
import { ObjectUtils } from '../../util/object.utils';
import { AccountService } from './account.service';
import { BasicAccount } from '../models/user/basic-account.model';
import { User } from '../models/user/user.model';
import {Observable, Subscriber, Subscription} from 'rxjs';
import { SignupData } from '../models/user/signup-data.model.ts';
import {LocalizedString} from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  private readonly authURL: string = '/auth';
  private routerEvent: Subscription;

  constructor(
    private http: HttpCustomService,
    private accountService: AccountService,
    private router: Router,
    private shareData: SharedDataService
  ) {
    this.fetchUserIfTokenExists();
  }

  public fetchUserIfTokenExists(): void {

    const loggedName = JwtManagerService.getNickFromToken();

    if (ObjectUtils.isDefined(loggedName) && JwtManagerService.getExpirationTimeValid()) {
      this.accountService.getAccountByNickAndSaveInShared(loggedName);
    } else {
      localStorage.clear();
    }
  }

  public sighIn(loginData: LoginData): void {
    const url: string = this.authURL + '/signin';
    loginData.login = loginData.login.toLowerCase();

    this.http.post(url, loginData)
      .pipe(map(data => Object.assign(new JwtToken(), data)))
      .subscribe((token: JwtToken) => {
          if (ObjectUtils.isDefined(token)) {
            JwtManagerService.saveToken(token);
          }
        }, error => {
          console.error('Acquisition token fail\n' + error);
        }, () => {
          this.router.navigate(['/home']);
        }
      ).add(() => {
      this.accountService.getAccountByNickAndSaveInShared(JwtManagerService.getNickFromToken());
    });
  }

  public signup(accountData: BasicAccount, userData: User): Observable<boolean> {
    const url: string = this.authURL + '/signup';
    accountData._login = accountData._login.toLowerCase();
    const dataForSighUp: SignupData = new SignupData(accountData, userData);
    console.log(dataForSighUp);

    return this.http.post(url, dataForSighUp);
  }

  public sighOut(): void {
    JwtManagerService.cleanTokenCache();
    this.shareData.setLoggedAccount(null);
    this.router.navigate(['/home']);
  }
}
