import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasicAccount} from '../models/user/basic-account.model';
import {RentalOfferFoundByTheSelectedParametersModel} from '../models/rental/rental-offer-found-by-the-selected-parameters.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loggedAccount = new BehaviorSubject<BasicAccount>(null);
  private offerFoundByParameters = new BehaviorSubject<Array<RentalOfferFoundByTheSelectedParametersModel>>(null);

  public setLoggedAccount(account: BasicAccount): void {
    this.loggedAccount.next(account);
  }

  public getLoggedAccount(): BehaviorSubject<BasicAccount> {
    return this.loggedAccount;
  }

  public getOfferFoundByParameters(): Observable<Array<RentalOfferFoundByTheSelectedParametersModel>> {
    return this.offerFoundByParameters.asObservable();
  }

  public setOfferFoundByParameters(offerFoundByParameters: Array<RentalOfferFoundByTheSelectedParametersModel>): void {
    this.offerFoundByParameters.next(offerFoundByParameters);
  }
}
