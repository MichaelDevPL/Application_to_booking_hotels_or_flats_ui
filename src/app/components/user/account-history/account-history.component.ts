import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {Router} from '@angular/router';
import {ScheduleService} from '../../../shared/services/schedule.service';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss']
})
export class AccountHistoryComponent implements OnInit {

  public historyBookedOfferObservable = this.scheduleService.getHistoryReservations(
    this.shareData.getLoggedAccount().getValue().id);

  constructor(
    private scheduleService: ScheduleService,
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
}
