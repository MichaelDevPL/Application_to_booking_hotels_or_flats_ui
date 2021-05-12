import {RentalImage} from './rental-image.model';

export class RentalOfferFoundByTheSelectedParametersModel{
  id: number;
  title: string;
  description: string;
  image: RentalImage[];
  dailyRate: number;
  clientAverageGrades: number;
}
