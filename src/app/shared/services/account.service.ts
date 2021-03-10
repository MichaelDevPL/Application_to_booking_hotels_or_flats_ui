import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BasicAccount} from '../models/user/basic-account.model';
import {map} from 'rxjs/operators';
import {JwtManagerService} from '../authentication/jwt-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly USERS_URL: string = '/account';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
    private router: Router,
  ) {}

  public getAccountByNickAndSaveInShared(accountNick: string): void{
    const url: string = this.USERS_URL + '/getAccountByNick/' + accountNick;

    this.http.get(url)
      .pipe(map(account => Object.assign(new BasicAccount(), account)))
      .subscribe(accountData => {
        this.sharedService.setLoggedAccount(accountData);
      }, error => {
        const errorMessage = `Error Code: ${error.status}\n\nMessage: ${error.statusText}`;
        window.alert(errorMessage);
        JwtManagerService.cleanTokenCache();
      });
  }

  public getLoggedAccount(): Observable<BasicAccount>{
    return this.sharedService.getLoggedAccount();
  }
}
