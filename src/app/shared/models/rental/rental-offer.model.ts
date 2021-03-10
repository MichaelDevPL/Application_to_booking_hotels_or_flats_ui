import { RentalCategory } from '../../enums/rental-category.enum';
import { RentalCalendar } from './rental-calendar.model';
import { RentalImage } from './rental-image.model';

export class RentalOffer {
  id?: bigint;
  title: string;
  description: string;
  city: string;
  address: string;
  category: RentalCategory;
  rentalImages: RentalImage[];
  bedrooms: number;
  dailyRate: number;
  createdAt?: string;
  offerOwnerId?: number;
  rentalSchedule?: RentalCalendar[];
}
