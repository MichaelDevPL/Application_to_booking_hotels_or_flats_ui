import {RentalCategory} from '../../enums/rental-category.enum';

export class RentalOfferViewToUserManageModel {
  id: bigint;
  title: string;
  category: RentalCategory;
  address: string;
  city: string;
}
