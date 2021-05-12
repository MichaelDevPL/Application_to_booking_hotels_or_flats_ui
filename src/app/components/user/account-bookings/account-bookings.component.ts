import {Component, OnInit} from '@angular/core';
import {RentalService} from '../../../shared/services/rental.service';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-account-bookings',
  templateUrl: './account-bookings.component.html',
  styleUrls: ['./account-bookings.component.scss']
})
export class AccountBookingsComponent implements OnInit {

  public bookedOfferObservable = this.rentalService.getAllBookedOfferByAccountId(this.shareData.getLoggedAccount().getValue().id);

  constructor(
    private rentalService: RentalService,
    private shareData: SharedDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  showOffer(offerId: bigint): void{
    const path = '/rentals/' + offerId;
    this.router.navigate([path]);
  }

  deleteBookedOffer(id: bigint): void {
    console.log('deleted');
  }

}
