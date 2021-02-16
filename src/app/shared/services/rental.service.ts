import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';
import {RentalOffer} from '../models/rental/rental-offer.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly UPLOUD_URL = '/rental';

  constructor(private sharedService: SharedDataService,
              private http: HttpCustomService,
              private router: Router) {
  }

  public createNewRentalOffer(newRentalOffer: RentalOffer): void {
    const url: string = this.UPLOUD_URL + '/create';


  }

}

