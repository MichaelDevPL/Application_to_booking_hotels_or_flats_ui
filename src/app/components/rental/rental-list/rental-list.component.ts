import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  public offersObservable = this.sharedDataService.getOfferFoundByParameters();
  public orderBy = '';
  public title = '';
  public endSliceNumberOfDisplayOffers = 20;

  constructor(
    private sharedDataService: SharedDataService
  ) {
  }

  ngOnInit(): void {
  }

  setTitle(numberOfOffer: number): string {
    if (numberOfOffer > 0) {
      return this.title = numberOfOffer + ' properties found';
    }
    return this.title = 'No properties found';
  }

  public showMoreOffers(): void {
    this.endSliceNumberOfDisplayOffers += 20;
  }
}
