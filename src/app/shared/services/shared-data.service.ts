import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasicAccount} from '../models/user/basic-account.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loggedAccount = new BehaviorSubject<BasicAccount>(null);

  public setLoggedAccount(account: BasicAccount): void {
    this.loggedAccount.next(account);
  }

  public getLoggedAccount(): BehaviorSubject<BasicAccount> {
    return this.loggedAccount;
  }
}
