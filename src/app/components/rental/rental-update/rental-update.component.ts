import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RentalService} from '../../../shared/services/rental.service';
import {RentalOffer} from '../../../shared/models/rental/rental-offer.model';
import {ObjectUtils} from '../../../util/object.utils';
import {UploadImageService} from '../../../shared/services/upload-image.service';
import {RentalScheduleModel} from '../../../shared/models/rental/rental-schedule.model';
import {ClientReview} from '../../../shared/models/rental/client-review.model';
import {RentalImage} from '../../../shared/models/rental/rental-image.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  public rentalEditForm: FormGroup;
  public newSelectedImages: Array<File> = new Array<File>();
  public previewNewImages = new Map();
  public submitted = false;

  constructor(
    private rentalService: RentalService,
    private uploadImageService: UploadImageService,
    private imageServices: UploadImageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  // convenience getter for easy access to form fields
  get getFromForm(): any {
    return this.rentalEditForm.controls;
  }

  ngOnInit(): void {

    this.rentalEditForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      category: ['', Validators.required],
      rentalImages: this.formBuilder.array([], Validators.required),
      bedrooms: ['', Validators.required],
      guests: ['', Validators.required],
      dailyRate: ['', Validators.required],
      createdAt: ['', Validators.required],
      offerOwnerId: ['', Validators.required],
      rentalSchedule: this.formBuilder.array([]),
      clientReviews: this.formBuilder.array([])
    });

    this.rentalService.getOfferById(this.route.snapshot.paramMap.get('id'))
      .subscribe(value => {

        value.rentalImages.forEach(image => {
          if (ObjectUtils.isDefined(image)) {
            this.addNewFormGroup('rentalImages', this.newFormGroupImagePath(image.path, image.id));
          }
        });

        value.rentalSchedule.forEach(reservation => {
          if (ObjectUtils.isDefined(reservation)) {
            this.addNewFormGroup('rentalSchedule', this.newFormGroupReservation(reservation));
          }
        });

        value.clientReviews.forEach(review => {
          if (ObjectUtils.isDefined(review)) {
            this.addNewFormGroup('clientReviews', this.newFormGroupReview(review));
          }
        });

        this.rentalEditForm.patchValue(value);
      });
  }

  offerIsDefine(): boolean {
    return this.rentalEditForm.valid;
  }

  /*Add images path as array to rentalForm*/
  getFormGroupControlAsArray(path: string): FormArray {
    return this.rentalEditForm.get(path) as FormArray;
  }

  newFormGroupImagePath(imagePath: string, id?: bigint): FormGroup {
    return this.formBuilder.group({
      id: [id],
      path: [imagePath, Validators.required]
    });
  }

  newFormGroupReservation(reservations: RentalScheduleModel): FormGroup {
    return this.formBuilder.group({
      id: [reservations.id, Validators.required],
      startRentDate: [reservations.startRentDate, Validators.required],
      endRentDate: [reservations.endRentDate, Validators.required],
      price: [reservations.price, Validators.required],
      clientId: [reservations.clientId, Validators.required],
    });
  }

  newFormGroupReview(review: ClientReview): FormGroup {
    return this.formBuilder.group({
      id: [review.id, Validators.required],
      starRating: [review.starRating, Validators.required],
      comment: [review.comment, Validators.required],
      createdAt: [review.createdAt, Validators.required],
      accountNick: [review.accountNick, Validators.required],
    });
  }

  addNewFormGroup(path: string, newFormGroup: FormGroup): any {
    return this.getFormGroupControlAsArray(path).push(newFormGroup);
  }

  selectNewImageFile(event: any): void {
    let imagesSize = 0;
    if (ObjectUtils.isDefined(this.newSelectedImages)) {
      const newImages: Array<File> = Array.from(event.target.files);

      newImages.forEach(newImage => {
        let imageExist = false;
        this.newSelectedImages.forEach(image => {
          if (image.name === newImage.name) {
            imageExist = true;
          }
        });
        if (!imageExist) {
          this.newSelectedImages.push(newImage);
        }
      });

    } else {
      this.newSelectedImages = Array.from(event.target.files);
    }

    for (const item of this.newSelectedImages) {
      imagesSize += item.size;
    }

    this.showSelectedImages();
  }

  showSelectedImages(): void {
    this.previewNewImages.clear();

    if (this.newSelectedImages != null) {
      for (const image of this.newSelectedImages) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e: any) => {
          this.previewNewImages.set(image.name, e.target.result);
        };
      }
    }
  }

  public loadImage(path: string): string {
    return this.imageServices.loadImage(path);
  }

  deleteImage(index: number, image: RentalImage): void {
    if ( window.confirm('Delete picture; ' + image.path)){
      this.rentalService.deleteImage(image.id);
      this.uploadImageService.deleteStoredImage(image.path);
      this.getFormGroupControlAsArray('rentalImages').removeAt(index);
    }
  }

  deleteNewSelectedImages(key: any): void {
    this.newSelectedImages.splice(this.newSelectedImages.findIndex(e => e.name === key), 1);
    this.previewNewImages.delete(key);
  }

  updateOffer(): void {
    this.submitted = true;
    const path = '/rentals/' + this.rentalEditForm.getRawValue().id;
    localStorage.setItem('parameters-to-search-offer', null);

    if (this.rentalEditForm.valid && !!this.newSelectedImages?.length) {
      this.uploadImageService.multiplesFilesUpload(this.newSelectedImages, this.rentalEditForm.getRawValue().city)
        .subscribe((event) => {
          if (event instanceof HttpResponse) {
            Object.assign(
              new Array<RentalImage>(),
              event.body
            ).forEach(value => {
              this.addNewFormGroup('rentalImages', this.newFormGroupImagePath(value.path));
            });
          }
        }).add(() => {
          this.rentalService.updateRentalOffer(this.rentalEditForm.getRawValue());
          this.router.navigate([path]);
      });

    }

    if (this.rentalEditForm.valid) {
      this.rentalService.updateRentalOffer(this.rentalEditForm.getRawValue());
      this.router.navigate([path]);
    }
  }

}
