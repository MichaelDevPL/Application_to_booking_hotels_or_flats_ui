import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {Router} from '@angular/router';
import {ScheduleService} from '../../../shared/services/schedule.service';

@Component({
  selector: 'app-account-bookings',
  templateUrl: './account-bookings.component.html',
  styleUrls: ['./account-bookings.component.scss']
})
export class AccountBookingsComponent implements OnInit {

  public bookedOfferObservable = this.scheduleService.getAllUserReservations(this.shareData.getLoggedAccount().getValue().id);

  constructor(
    private scheduleService: ScheduleService,
    private shareData: SharedDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  showOffer(offerId: bigint): void{
    const path = '/rentals/' + offerId;
    localStorage.setItem('parameters-to-search-offer', null);
    this.router.navigate([path]);
  }

  deleteBookedOffer(id: bigint): void {
    this.scheduleService.deleteReservation(id).subscribe().add( () => {
      window.location.reload();
    });
  }

  allowResignation(date: string): boolean{
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(date);

    return Math.floor((new Date().getTime() - startDate.getTime()) / oneDay) < -2;
  }

}
