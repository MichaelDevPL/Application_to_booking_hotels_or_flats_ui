import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasicAccount} from '../models/user/basic-account.model';
import {RentalOfferFoundByTheSelectedParametersModel} from '../models/rental/rental-offer-found-by-the-selected-parameters.model';
import {ObjectUtils} from '../../util/object.utils';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loggedAccount = new BehaviorSubject<BasicAccount>(null);
  private offerFoundByParameters = new BehaviorSubject<Array<RentalOfferFoundByTheSelectedParametersModel>>(null);

  public setLoggedAccount(account: BasicAccount): void {
    localStorage.setItem('account', JSON.stringify(account));
    this.loggedAccount.next(account);

  }

  public getLoggedAccount(): BehaviorSubject<BasicAccount> {
    if (this.loggedAccount.getValue() === null && JSON.parse(localStorage.getItem('account')) !== null){
      this.loggedAccount.next(Object.assign(new BasicAccount(), JSON.parse(localStorage.getItem('account'))));
    }
    return this.loggedAccount;
  }

  public getOfferFoundByParameters(): Observable<Array<RentalOfferFoundByTheSelectedParametersModel>> {
    if (this.offerFoundByParameters.getValue() === null){
      this.offerFoundByParameters.next(JSON.parse(localStorage.getItem('offers')));
    }
    return this.offerFoundByParameters.asObservable();
  }

  public setOfferFoundByParameters(offerFoundByParameters: Array<RentalOfferFoundByTheSelectedParametersModel>): void {
    localStorage.setItem('offers', JSON.stringify(offerFoundByParameters));
    this.offerFoundByParameters.next(offerFoundByParameters);
  }
}
