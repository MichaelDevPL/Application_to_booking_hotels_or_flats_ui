import {RentalOffer} from './rental-offer.model';

export class ClientReview{
  id: bigint;
  starRating: number;
  comment: string;
  createdAt: string;
  accountNick: string;
  rentalOfferId?: bigint;
}
