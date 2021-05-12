import {Injectable} from '@angular/core';
import {HttpCustomService} from '../../util/http-custom.service';
import {LoginData} from '../models/user/login.model';
import {Router} from '@angular/router';
import {SharedDataService} from './shared-data.service';
import {catchError, map} from 'rxjs/operators';
import {JwtToken} from '../authentication/jwt-token.model';
import {JwtManagerService} from '../authentication/jwt-manager.service';
import {ObjectUtils} from '../../util/object.utils';
import {AccountService} from './account.service';
import {BasicAccount} from '../models/user/basic-account.model';
import {User} from '../models/user/user.model';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {SignupData} from '../models/user/signup-data.model.ts';


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

    if (ObjectUtils.isDefined(loggedName) && JwtManagerService.getExpirationTimeValid()) {
      this.accountService.getAccountByNickAndSaveInShared(loggedName);
    }

    if (ObjectUtils.isDefined(loggedName) && !JwtManagerService.getExpirationTimeValid()) {
      this.sighOut();
    }
  }

  public sighIn(loginData: LoginData): void {
    const url: string = this.authURL + '/signin';
    loginData.login = loginData.login.toLowerCase();

    this.http.post(url, loginData)
      .pipe(
        map(data => Object.assign(new JwtToken(), data)),
        catchError(err => {
          if ([401, 403].includes(err.status)){
            window.alert('Wrong password or login');
          }

          return EMPTY;
        })
      )
      .subscribe((token: JwtToken) => {
          if (ObjectUtils.isDefined(token)) {
            JwtManagerService.saveToken(token);
          }
        }
      ).add(() => {
        if (ObjectUtils.isDefined(JwtManagerService.getNickFromToken())){
          this.accountService.getAccountByNickAndSaveInShared(JwtManagerService.getNickFromToken());
          this.router.navigate(['/home']);
        }
    });
  }

  public signup(accountData: BasicAccount, userData: User): Observable<boolean> {
    const url: string = this.authURL + '/signup';
    accountData.login = accountData.login.toLowerCase();
    const dataForSighUp: SignupData = new SignupData(accountData, userData);
    return this.http.post(url, dataForSighUp);
  }

  public sighOut(): void {
    this.shareData.setLoggedAccount(null);
    JwtManagerService.cleanTokenCache();
    this.router.navigate(['/home']).then( () => {
      window.location.reload();
    });
  }

  public refreshToken(): void{
    const url: string = this.authURL + '/refresh';
    this.http.get(url).pipe(
      map(data => Object.assign(new JwtToken(), data))
    )
      .subscribe( (token: JwtToken) => {
        if (ObjectUtils.isDefined(token)) {
          JwtManagerService.saveToken(token);
        }
      });
  }
}
