import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../shared/services/schedule.service';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rental-schedule',
  templateUrl: './rental-schedule.component.html',
  styleUrls: ['./rental-schedule.component.scss']
})
export class RentalScheduleComponent implements OnInit {

  public rentalOfferScheduleObservable = this.scheduleService.getRentalOfferSchedule(
    this.route.snapshot.paramMap.get('id')
  );
  public clientId: bigint = null;

  constructor(
    private scheduleService: ScheduleService,
    private shareData: SharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  loadClientContact(clientId: bigint): void {
      this.clientId = clientId;
  }

}
