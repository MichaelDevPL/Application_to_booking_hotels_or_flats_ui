import {Injectable, OnDestroy} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import {BasicAccount} from '../models/user/basic-account.model';
import {catchError, map, shareReplay, takeUntil} from 'rxjs/operators';
import {JwtManagerService} from '../authentication/jwt-manager.service';
import {User} from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnDestroy {

  private readonly USERS_URL: string = '/account';
  private ngDestroy = new Subject<void>();

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
    private router: Router,
  ) {
  }

  public getAccountByNickAndSaveInShared(accountNick: string): void {
    const url: string = this.USERS_URL + '/getAccountByNick/' + accountNick;

    this.http.get(url)
      .pipe(
        map(account => Object.assign(new BasicAccount(), account)),
        takeUntil(this.ngDestroy)
      )
      .subscribe(accountData => {
        this.sharedService.setLoggedAccount(accountData);
      });
  }

  public getLoggedAccount(): Observable<BasicAccount> {
    return this.sharedService.getLoggedAccount();
  }

  public getUserByAccountId(accountId: bigint): Observable<User> {
    const url: string = this.USERS_URL + '/getUserData/' + accountId;
    return this.http.get(url);
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
    this.ngDestroy.unsubscribe();
  }
}
