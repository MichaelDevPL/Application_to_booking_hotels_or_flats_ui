import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Observable} from 'rxjs';
import {BookedOfferModel} from '../models/rental/booked-offer.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly UPLOAD_URL = '/rental/schedule';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
  ) {
  }

  public deleteReservation(reservationId: bigint): Observable<void> {
    const url: string = this.UPLOAD_URL + '/delete-reservation/' + reservationId;

    return this.http.delete(url);
  }

  public getAllUserReservations(accountId: bigint): Observable<Array<BookedOfferModel>> {
    const url: string = this.UPLOAD_URL + '/user-reservations/' + accountId;

    return this.http.get(url);
  }

  public getHistoryReservations(accountId: bigint): Observable<Array<BookedOfferModel>> {
    const url: string = this.UPLOAD_URL + '/history-user-reservations/' + accountId;

    return this.http.get(url);
  }
}
