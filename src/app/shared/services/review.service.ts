import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {ClientReview} from '../models/rental/client-review.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly UPLOAD_URL = '/rental/review';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
  ) {
  }

  public createReview(newReview: ClientReview): Observable<void> {
    const url: string = this.UPLOAD_URL + '/new-review';

    return this.http.post(url, newReview);
  }

  public getAllReviewBelongToAccountNick(accountNick: string): Observable<Array<ClientReview>> {
    const url: string = this.UPLOAD_URL + '/get-all-account-reviews/' + accountNick;

    return this.http.get(url);
  }

  public deleteReview(reviewId: bigint): Observable<void> {
    const url: string = this.UPLOAD_URL + '/delete/' + reviewId;

    return this.http.delete(url);
  }
}
