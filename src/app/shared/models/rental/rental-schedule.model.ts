import {RentalOffer} from './rental-offer.model';

export class RentalScheduleModel {
  id: bigint;
  startRentDate: string;
  endRentDate: string;
  price: number;
  clientId: bigint;
  rentalOffer?: RentalOffer;

}
