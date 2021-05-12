import {Component, Input, OnInit} from '@angular/core';
import {UploadImageService} from '../../../shared/services/upload-image.service';

@Component({
  selector: 'app-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.scss']
})
export class RentalListItemComponent implements OnInit {

  @Input() count: number;
  @Input() offer: any;
  public starRating: number;

  constructor(
    private imageService: UploadImageService
  ) {
  }

  ngOnInit(): void {
    this.starRating = this.offer.clientAverageGrades;
  }

  public loadImage(): string {
    return this.imageService.loadImage(this.offer.rentalImages[0].path);
  }
}
