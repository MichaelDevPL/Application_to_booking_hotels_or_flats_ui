import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {Router} from '@angular/router';
import {ReviewService} from '../../../shared/services/review.service';

@Component({
  selector: 'app-account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.scss']
})
export class AccountReviewsComponent implements OnInit {

  public allReviewBelongToAccountObservable = this.reviewService.getAllReviewBelongToAccountNick(
    this.shareData.getLoggedAccount().getValue().login);

  constructor(
    private reviewService: ReviewService,
    private shareData: SharedDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showOffer(offerId: bigint): void{
    const path = '/rentals/' + offerId;
    localStorage.setItem('parameters-to-search-offer', null);
    this.router.navigate([path]);
  }

  deleteReview(reviewId: bigint): void{
    this.reviewService.deleteReview(reviewId).subscribe().add( () => {
      window.location.reload();
    });
  }
}
