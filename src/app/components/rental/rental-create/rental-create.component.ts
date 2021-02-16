import {Component, OnInit} from '@angular/core';
import {UploadImageService} from '../../../shared/services/upload-image.service';
import {HttpResponse} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RentalImage} from '../../../shared/models/rental/rental-image.model';
import {JwtManagerService} from 'src/app/shared/authentication/jwt-manager.service';
import {RentalCategory} from '../../../shared/enums/rental-category.enum';
import {ObjectUtils} from '../../../util/object.utils';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss'],
})
export class RentalCreateComponent implements OnInit {

  public selectedImages: Array<File>;
  public urls = new Map();

  public rentalForm: FormGroup;
  public categories = Object.values(RentalCategory).filter(
    (value) => typeof value === 'string'
  );

  public submitted = false;

  constructor(
    private uploadImageService: UploadImageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.rentalForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      category: ['', Validators.required],
      images: this.formBuilder.array([]),
      bedrooms: ['', Validators.required],
      dailyRate: ['', Validators.required]
    });

  }

  /*Add images path as array to rentalForm*/
  images(): FormArray {
    return this.rentalForm.get('images') as FormArray;
  }

  newFormGroupImagePath(imagePath: string): FormGroup {
    return this.formBuilder.group({
      path: [imagePath, Validators.required]
    });
  }

  addNewImage(imageFormGroup: FormGroup): any {
    return this.images().push(imageFormGroup);
  }

  // convenience getter for easy access to form fields
  get getFromForm(): any {
    return this.rentalForm.controls;
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
          console.log('File successfully uploaded!');
          Object.assign(
            new Array<RentalImage>(),
            event.body
          ).forEach(value => {
            this.addNewImage(this.newFormGroupImagePath(value.path));
          });
        }
      });
  }

  deleteImageFromSelected(key: any): void {
    this.selectedImages.splice(this.selectedImages.findIndex(e => e.name === key), 1);
    this.urls.delete(key);
  }

  submit(): void {
    this.submitted = true;
    this.previewSelectedImages();
    // this.upload();
    // console.log(JwtManagerService.getExpirationTimeValid());
    // console.log(this.selectedImages);
    // this.deleteImageFromSelected(0);
  }
}
