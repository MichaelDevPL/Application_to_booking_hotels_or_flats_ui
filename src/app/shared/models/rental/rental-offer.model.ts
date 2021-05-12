import { RentalCategory } from '../../enums/rental-category.enum';
import { RentalCalendar } from './rental-calendar.model';
import { RentalImage } from './rental-image.model';
import {ClientReview} from './client-review.model';

export class RentalOffer {
  id?: bigint;
  title: string;
  description: string;
  city: string;
  address: string;
  category: RentalCategory;
  rentalImages: RentalImage[];
  bedrooms: number;
  quests: number;
  dailyRate: number;
  createdAt?: string;
  offerOwnerId?: bigint;
  rentalSchedule?: RentalCalendar[];
  clientReviews?: ClientReview[];
}
