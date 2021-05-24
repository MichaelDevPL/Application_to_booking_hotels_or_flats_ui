import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {RentalOffer} from '../models/rental/rental-offer.model';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {DataToSearchOffersModel} from '../models/rental/data-to-search-offers.model';
import {RentalOfferFoundByTheSelectedParametersModel} from '../models/rental/rental-offer-found-by-the-selected-parameters.model';
import {ReserveOfferModel} from '../models/rental/reserve-offer-model';
import {CreateOfferResponseModel} from '../models/rental/create-offer-response.model';
import {RentalOfferViewToUserManageModel} from '../models/rental/rental-offer-view-to-user-manage.model';
import {List} from 'postcss/lib/list';

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

  public createNewRentalOffer(newRentalOffer: RentalOffer): Observable<CreateOfferResponseModel> {
    const url: string = this.UPLOAD_URL + '/create';
    newRentalOffer.offerOwnerId = this.sharedService.getLoggedAccount().getValue().id;
    newRentalOffer.createdAt = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);

    return this.http.post(url, newRentalOffer);
  }

  public updateRentalOffer( rentalOffer: RentalOffer): void {
    const url: string = this.UPLOAD_URL + '/update';

    this.http.put(url, rentalOffer).subscribe();
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

  public getOfferBelongToAccount(accountId: bigint): Observable<Array<RentalOfferViewToUserManageModel>> {
    const url: string = this.UPLOAD_URL + '/user/' + accountId;

    return this.http.get(url);
  }

  public createReserve(newReserve: ReserveOfferModel): Observable<void> {
    const url: string = this.UPLOAD_URL + '/create-reservation';

    return this.http.post(url, newReserve);
  }

  public deleteOffer(offerId: bigint): Observable<void> {
    const url: string = this.UPLOAD_URL + '/delete/' + offerId;

    return this.http.delete(url);
  }

  public deleteImage(imageId: bigint): void {
    const url: string = this.UPLOAD_URL + '/deleteImage/' + imageId;

    this.http.delete(url).subscribe();
  }
}

