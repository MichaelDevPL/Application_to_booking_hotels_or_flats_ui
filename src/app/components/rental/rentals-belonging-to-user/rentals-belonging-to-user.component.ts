import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {Router} from '@angular/router';
import {RentalService} from '../../../shared/services/rental.service';

@Component({
  selector: 'app-rentals-belonging-to-user',
  templateUrl: './rentals-belonging-to-user.component.html',
  styleUrls: ['./rentals-belonging-to-user.component.scss']
})
export class RentalsBelongingToUserComponent implements OnInit {

  public rentalOffersViewToUserManageObservable = this.rentalService.getOfferBelongToAccount(
    this.shareData.getLoggedAccount().getValue().id
  );

  constructor(
    private rentalService: RentalService,
    private shareData: SharedDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  scheduleOffer(offerId: bigint): void {
    this.router.navigate(['user-rentals/schedule/' + offerId]);
  }

  editOffer(offerId: bigint): void {
    this.router.navigate(['user-rentals/update/' + offerId]);
  }

  deleteOffer(offerId: bigint): void {
    if (window.confirm('Delete offer?')) {
      this.rentalService.deleteOffer(offerId).subscribe().add( () => {
        window.location.reload();
      });
    }
  }
}
