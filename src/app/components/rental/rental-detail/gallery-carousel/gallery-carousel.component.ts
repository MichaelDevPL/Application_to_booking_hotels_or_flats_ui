import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RentalImage} from '../../../../shared/models/rental/rental-image.model';
import {UploadImageService} from '../../../../shared/services/upload-image.service';
import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.scss'],
  animations: [
    trigger('slide-in', [
      state('left', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('middle', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),
      state('right', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('left => middle', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('250ms')
      ]),
      transition('right => middle', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('250ms')
      ]),
      transition('middle => *', [
        animate('250ms')
      ])
    ])
  ]
})
export class GalleryCarouselComponent implements OnInit {

  @Input() images: Array<RentalImage>;
  @Input() selectedImage: number;
  @Output() closerCarousel = new EventEmitter<void>();

  public animState = 'middle';
  public animImage: number;

  constructor(private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.animImage = this.selectedImage;
  }

  public close(): void {
    this.closerCarousel.emit();
  }

  public previous(): void {
    this.animState = 'left';
    this.selectedImage = this.selectedImage > 0 ? this.selectedImage - 1 : this.images.length - 1;
    this.blur();
  }

  public next(): void {
    this.animState = 'right';
    this.selectedImage = this.selectedImage < this.images.length - 1 ? this.selectedImage + 1 : 0;
    this.blur();
  }

  public animeDone(): void {
    this.animImage = this.selectedImage;
    this.animState = 'middle';
  }

  private blur(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement !== null) {
      activeElement.blur();
    }
  }

  public OnEvent(event: Event): void {
    event.stopPropagation();
  }

  public loadImage(path: string): string {
    return this.uploadImage.loadImage(path);
  }
}
