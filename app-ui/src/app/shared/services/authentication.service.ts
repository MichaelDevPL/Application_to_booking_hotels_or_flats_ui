import { Injectable } from '@angular/core';
import { HttpCustomService } from '../../util/http-custom.service';
import { LoginData } from '../models/user/login.model';
import { Router } from '@angular/router';
import { SharedDataService } from './shared-data.service';
import { map } from 'rxjs/operators';
import { JwtToken } from '../authentication/jwt-token.model';
import { JwtManagerService } from '../authentication/jwt-manager.service';
import { ObjectUtils } from '../../util/object.utils';
import { AccountService } from './account.service';
import { BasicAccount } from '../models/user/basic-account.model';
import { User } from '../models/user/user.model';
import { Observable } from 'rxjs';
import { SignupData } from '../models/user/signup-data.model.ts';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authURL: string = '/auth';

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

    if (ObjectUtils.isDefined(loggedName)) {
      if (JwtManagerService.getExpirationTimeValid()) {
        this.accountService.getAccountByNickAndSaveInShared(loggedName);
      } else {
        this.sighOut();
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

  public sighIn(loginData: LoginData): void {
    const url: string = this.authURL + '/signin';

    this.http.post(url, loginData)
      .pipe(map(data => Object.assign(new JwtToken(), data)))
      .subscribe((token: JwtToken) => {
        if (ObjectUtils.isDefined(token)) {
          JwtManagerService.saveToken(token);
          this.accountService.getAccountByNickAndSaveInShared(JwtManagerService.getNickFromToken());
        }
      }, error => {
        console.error('Acquisition token fail\n' + error);
      }, () => {
        this.router.navigate(['/home']);
      }
      );
  }

  public signup(accountData: BasicAccount, userData: User): Observable<boolean> {
    const url: string = this.authURL + '/signup';
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
