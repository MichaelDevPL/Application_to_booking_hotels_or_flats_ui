import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RentalService} from '../../../shared/services/rental.service';
import {RentalOffer} from '../../../shared/models/rental/rental-offer.model';
import {map} from 'rxjs/operators';
import {UploadImageService} from '../../../shared/services/upload-image.service';
import {DataToSearchOffersModel} from '../../../shared/models/rental/data-to-search-offers.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {JwtManagerService} from '../../../shared/authentication/jwt-manager.service';
import {formatDate} from '@angular/common';
import {ReviewService} from '../../../shared/services/review.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  public offer: RentalOffer = new RentalOffer();
  public selectedImage: number = null;
  public userTypedData: DataToSearchOffersModel;
  public reserveFrom: FormGroup;
  public reviewFrom: FormGroup;
  public starRating = 0;
  public endSliceNumberOfDisplayReviews = 5;
  public accountNick = JwtManagerService.getNickFromToken();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private reviewService: ReviewService,
    private uploadService: UploadImageService,
    private shareData: SharedDataService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.rentalService.getOfferById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        map(value => Object.assign(RentalOffer, value)),
      )
      .subscribe(value => {
        this.offer = value;
        if (value.clientReviews.length > 0) {
          this.starRating = Number((value.clientReviews.map(star => star.starRating)
            .reduce((previousValue, currentValue) => currentValue += previousValue) / value.clientReviews.length).toFixed(2));
        }
      }, error => console.log(error));
  }

  ngOnInit(): void {
    this.userTypedData = JSON.parse(localStorage.getItem('parameters-to-search-offer'));

    this.reserveFrom = new FormBuilder().group({
      startDate: new FormControl(this.userTypedData == null ? '' : this.userTypedData.startDate, Validators.required),
      endDate: new FormControl(this.userTypedData == null ? '' : this.userTypedData.endDate, Validators.required),
      price: new FormControl('', Validators.required),
      clientId: new FormControl('', Validators.required),
      offerId: new FormControl('', Validators.required)
    });

    this.reviewFrom = new FormBuilder().group({
      starRating: new FormControl(0, Validators.required),
      comment: new FormControl('', Validators.required),
      createdAt: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', this.locale), Validators.required),
      accountNick: new FormControl(this.accountNick, Validators.required),
      rentalOfferId: new FormControl( null, Validators.required)
    });

  }

  public loadImageByPath(path: string): string {
    return this.uploadService.loadImage(path);
  }

  public calculateDiff(): number {
    const startDate = new Date(this.userTypedData.startDate);
    const endDate = new Date(this.userTypedData.endDate);

    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
  }

  public calculateDaysPassed(date: string): any {
    const oneDay = 24 * 60 * 60 * 1000;
    const createAt = new Date(date);
    const today = new Date();

    const daysPassed = Math.floor((today.getTime() - createAt.getTime()) / oneDay);

    return daysPassed >= 0 ? daysPassed : 0;
  }

  public submit(): any {
    if (this.shareData.getLoggedAccount().getValue() === null && !JwtManagerService.getExpirationTimeValid()) {
      return this.router.navigate(['/login']);
    }

    this.reserveFrom.get('clientId').setValue(this.shareData.getLoggedAccount().getValue().id);
    this.reserveFrom.get('price').setValue(this.calculateDiff() * this.offer.dailyRate);
    this.reserveFrom.get('offerId').setValue(this.offer.id);

    if (this.reserveFrom.valid && window.confirm('Save reserve?')) {
      this.rentalService.createReserve(this.reserveFrom.getRawValue()).subscribe().add( ()  => {
        this.router.navigate(['/account/bookings']);
      });
    }
  }

  public countStarRating(numberOfStar: number): string {
    if (this.offer.clientReviews.length < 1) {
      return '00.00';
    }

    const score = this.offer.clientReviews
      .filter(value => value.starRating === numberOfStar).length * (100 / this.offer.clientReviews.length);

    return score < 10 ? '0' + score.toFixed(2) : score.toFixed(2);
  }

  public increaseEndNumberOfDisplayReviews(): void {
    this.endSliceNumberOfDisplayReviews += 10;
  }

  public saveReview(): void {
    this.reviewFrom.get('rentalOfferId').setValue(this.offer.id);
    if (this.reviewFrom.valid) {
      this.reviewService.createReview(this.reviewFrom.getRawValue()).subscribe().add( () => {
        window.location.reload();
      });
    }
  }
}
