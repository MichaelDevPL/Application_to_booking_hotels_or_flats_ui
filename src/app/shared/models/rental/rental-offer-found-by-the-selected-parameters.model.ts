import {RentalImage} from './rental-image.model';

export class RentalOfferFoundByTheSelectedParametersModel{
  id: number;
  title: string;
  address: string;
  city: string;
  image: RentalImage[];
  dailyRate: number;
}
