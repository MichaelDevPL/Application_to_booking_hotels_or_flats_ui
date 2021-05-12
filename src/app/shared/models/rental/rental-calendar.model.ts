import {RentalOffer} from './rental-offer.model';

export class RentalCalendar {
  id: bigint;
  startRentDate: string;
  endRentDate: string;
  price?: number;
  clientId?: bigint;
  rentalOffer: RentalOffer;

}
