import {Component, OnInit} from '@angular/core';
import {UploadImageService} from '../../../shared/services/upload-image.service';
import {HttpResponse} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RentalImage} from '../../../shared/models/rental/rental-image.model';
import {RentalCategory} from '../../../shared/enums/rental-category.enum';
import {ObjectUtils} from '../../../util/object.utils';
import {RentalService} from '../../../shared/services/rental.service';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MapService} from '../../../shared/services/map.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss'],
})
export class RentalCreateComponent implements OnInit {

  /*_______________________________________*/
  public filteredCity: Observable<string[]>;
  /*_______________________________________*/
  public selectedImages: Array<File> = new Array<File>();
  public storedImagesPath: Array<string> = new Array<string>();
  public urls = new Map();
  public rentalForm: FormGroup;
  public categories = Object.values(RentalCategory).filter(
    (value) => typeof value === 'string'
  );
  public submitted = false;
  private cityListHolder: any = [];

  constructor(
    private sharedDataService: SharedDataService,
    private uploadImageService: UploadImageService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router
  ) {
  }

  // convenience getter for easy access to form fields
  get getFromForm(): any {
    return this.rentalForm.controls;
  }

  ngOnInit(): void {

    this.rentalForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      category: ['', Validators.required],
      rentalImages: this.formBuilder.array([]),
      bedrooms: ['', Validators.required],
      guests: ['', Validators.required],
      dailyRate: ['', Validators.required]
    });

    this.filteredCity = this.rentalForm.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value.toString().length > 1) {
          return this.filter(value);
        }
      })
    );
  }

  /*Add images path as array to rentalForm*/
  images(): FormArray {
    return this.rentalForm.get('rentalImages') as FormArray;
  }

  newFormGroupImagePath(imagePath: string): FormGroup {
    return this.formBuilder.group({
      path: [imagePath, Validators.required]
    });
  }

  addNewImage(imageFormGroup: FormGroup): any {
    return this.images().push(imageFormGroup);
  }

  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  selectFile(event: any): void {
    let imagesSize = 0;
    if (ObjectUtils.isDefined(this.selectedImages)) {
      const newImages: Array<File> = Array.from(event.target.files);

      newImages.forEach(newImage => {
        let imageExist = false;
        this.selectedImages.forEach(image => {
          if (image.name === newImage.name) {
            imageExist = true;
          }
        });
        if (!imageExist) {
          this.selectedImages.push(newImage);
        }
      });

    } else {
      this.selectedImages = Array.from(event.target.files);
    }

    for (const item of this.selectedImages) {
      imagesSize += item.size;
    }

    this.previewSelectedImages();
  }

  previewSelectedImages(): void {
    this.urls.clear();

    if (this.selectedImages != null) {
      for (const image of this.selectedImages) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e: any) => {
          this.urls.set(image.name, e.target.result);
        };
      }
    }
  }

  upload(): void {
    this.uploadImageService
      .multiplesFilesUpload(Array.from(this.selectedImages), this.rentalForm.getRawValue().city)
      .subscribe((event) => {
        if (event instanceof HttpResponse) {
          Object.assign(
            new Array<RentalImage>(),
            event.body
          ).forEach(value => {
            this.storedImagesPath.push(value.path);
            this.addNewImage(this.newFormGroupImagePath(value.path));
          });
        }
      }).add(() => {
      this.rentalService.createNewRentalOffer(this.rentalForm.getRawValue())
        .subscribe((value) => {
          if (value.createdSuccessfully) {
            const path = '/rentals/' + value.offerId;
            localStorage.setItem('parameters-to-search-offer', null);
            this.router.navigate([path]);
          } else {
            const errorMessage = `Problem occurred !!!\n Please try again`;
            window.alert(errorMessage);

            this.storedImagesPath.forEach(path => {
              this.uploadImageService.deleteStoredImage(path);
            });

            window.location.reload();
          }
        });
    });
  }

  deleteImageFromSelected(key: any): void {
    this.selectedImages.splice(this.selectedImages.findIndex(e => e.name === key), 1);
    this.urls.delete(key);
  }

  public search(): void {
    if (this.rentalForm.valid) {
      this.rentalService.searchOfferByChosenData(this.rentalForm.getRawValue()).subscribe(
        value => {
          this.sharedDataService.setOfferFoundByParameters(value);
        }, error => console.log(error),
        () => this.router.navigate(['/rentals']));

    }
  }

  public normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  submit(): void {
    this.submitted = true;
    if (this.rentalForm.valid && this.selectedImages.length > 0) {
      this.upload();
    }
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    this.suggestionCity(filterValue);
    return this.cityListHolder.filter(city => this.normalizeValue(city).includes(filterValue));
  }

  private suggestionCity(value: string): void {
    this.mapService.getAddress(value)
      .subscribe(response => {
        let listTempHolder: any = [];
        const responseProperties = Object.keys(response);

        for (const prop of responseProperties) {
          listTempHolder.push(response[prop]);
        }

        listTempHolder = listTempHolder[0];
        this.cityListHolder = [];

        if (ObjectUtils.isDefined(listTempHolder)) {
          for (const city of listTempHolder) {
            if (city.matchLevel === 'city') {
              this.cityListHolder.push(city.address.city + ', ' + city.address.country);
            }
          }
        }
      }, err => {
        console.log(err);
      });
  }
}
