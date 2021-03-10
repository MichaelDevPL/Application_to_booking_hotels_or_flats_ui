import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MapService} from '../../shared/services/map.service';
import {ObjectUtils} from '../../util/object.utils';
import {RentalService} from '../../shared/services/rental.service';
import {SharedDataService} from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
  providers: [DatePipe]
})

export class HomePanelComponent implements OnInit {

  public filteredCity: Observable<string[]>;
  public searchAccommodationForm: FormGroup;
  public showGuestCont = false;
  public numberOfGuest = 1;
  public numberOfRoom = 1;

  /*_______________________________________*/

  private cityListHolder: any = [];

  /*_______________________________________*/

  ngOnInit(): void {

    this.searchAccommodationForm = this.formBuilder.group({
      city: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(new Date(), Validators.required),
      numberOfGuest: new FormControl(1, Validators.required),
      numberOfRoom: new FormControl(1, Validators.required)
    });

    this.filteredCity = this.searchAccommodationForm.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value.toString().length > 1) {
          return this.filter(value);
        }
      })
    );
  }

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private mapService: MapService,
              private rentalService: RentalService,
              private sharedDataService: SharedDataService) {
  }

  public search(): void {
    console.log(this.searchAccommodationForm.getRawValue());

    if (this.searchAccommodationForm.valid) {
      this.rentalService.searchOfferBycChosenData(this.searchAccommodationForm.getRawValue()).subscribe(
        value => {
          this.sharedDataService.setOfferFoundByParameters(value);
          console.log(value);
        }, error => console.log(error),
        () => this.router.navigate(['/rentals']));

    }
  }

  showGuestsContent(): void {
    this.showGuestCont = !this.showGuestCont;
  }

  increaseGuestNumber(): void {
    this.searchAccommodationForm.controls.numberOfGuest.setValue(++this.numberOfGuest);

  }

  decreaseGuestNumber(): void {
    if (this.numberOfGuest > 1) {
      this.searchAccommodationForm.controls.numberOfGuest.setValue(--this.numberOfGuest);
    }
  }

  increaseRoomNumber(): void {
    this.searchAccommodationForm.controls.numberOfRoom.setValue(++this.numberOfRoom);
  }

  decreaseRoomNumber(): void {
    if (this.numberOfRoom > 1) {
      this.searchAccommodationForm.controls.numberOfRoom.setValue(--this.numberOfRoom);
    }
  }
  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    this.suggestionCity(filterValue);
    return this.cityListHolder.filter(city => this.normalizeValue(city).includes(filterValue));
  }

  public normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
