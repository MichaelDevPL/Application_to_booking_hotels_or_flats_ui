import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {RentalOffer} from '../models/rental/rental-offer.model';
import {EMPTY, Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {DataToSearchOffersModel} from '../models/rental/data-to-search-offers.model';
import {RentalOfferFoundByTheSelectedParametersModel} from '../models/rental/rental-offer-found-by-the-selected-parameters.model';
import {ReserveOfferModel} from '../models/rental/reserve-offer-model';
import {ClientReview} from '../models/rental/client-review.model';
import {BookedOfferModel} from '../models/rental/booked-offer.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly UPLOAD_URL = '/rental/offer';

  constructor(private sharedService: SharedDataService,
              private http: HttpCustomService,
              private router: Router,
              @Inject(LOCALE_ID) private locale: string) {
  }

  public createNewRentalOffer(newRentalOffer: RentalOffer): Observable<boolean> {
    const url: string = this.UPLOAD_URL + '/create';
    newRentalOffer.offerOwnerId = this.sharedService.getLoggedAccount().getValue().id;
    newRentalOffer.createdAt = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);

    return this.http.post(url, newRentalOffer);
  }

  public searchOfferByChosenData(dataToSearchOffersModel: DataToSearchOffersModel)
    : Observable<Array<RentalOfferFoundByTheSelectedParametersModel>> {
    const url: string = this.UPLOAD_URL + '/search';

    dataToSearchOffersModel.startDate = formatDate(dataToSearchOffersModel.startDate, 'yyyy-MM-dd', this.locale);
    dataToSearchOffersModel.endDate = formatDate(dataToSearchOffersModel.endDate, 'yyyy-MM-dd', this.locale);

    localStorage.setItem('parameters-to-search-offer', JSON.stringify(dataToSearchOffersModel));

    return this.http.post(url, dataToSearchOffersModel);
  }

  public getOfferById(id: string): Observable<RentalOffer> {
    const url: string = this.UPLOAD_URL + '/' + id;

    return this.http.get(url);
  }

  public saveReserve(newReserve: ReserveOfferModel): Observable<void> {
    const url: string = this.UPLOAD_URL + '/save-reserve';

    return this.http.post(url, newReserve);
  }

  public createReview(newReview: ClientReview): Observable<void> {
    const url: string = this.UPLOAD_URL + '/create-review';

    return this.http.post(url, newReview);
  }

  public getAllBookedOfferByAccountId(accountID: bigint): Observable<Array<BookedOfferModel>> {
    const url: string = this.UPLOAD_URL + '/all-booked-offer-by-user/' + accountID;

    return this.http.get(url);
  }
}

