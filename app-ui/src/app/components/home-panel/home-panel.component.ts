import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MapService} from '../../shared/services/map.service';
import {ObjectUtils} from '../../util/object.utils';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
  providers: [DatePipe]
})

export class HomePanelComponent implements OnInit {

  private choseCity: string;

  public control = new FormControl();
  public filteredCity: Observable<string[]>;
  public datePickerForm: FormGroup;
  public showGuestCont = false;
  public numberOfGuest = 1;
  public numberOfRoom = 1;

  /*_______________________________________*/

  private cityListHolder: any = [];

  /*_______________________________________*/

  ngOnInit(): void {
    this.filteredCity = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value.toString().length > 1) {
          return this.filter(value);
        }
      })
    );

    this.datePickerForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private mapService: MapService) {
  }

  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1*/
  public search(): void {
/*    console.log(this.choseCity);
    console.log(this.datePipe.transform(this.datePickerForm.value.startDate, 'dd-MM-yyyy'));
    console.log(this.datePipe.transform(this.datePickerForm.value.endDate, 'dd-MM-yyyy'));
    console.log(this.numberOfGuest);
    console.log(this.numberOfRoom);
    this.router.navigate(['/rentals']);*/

  }

  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1*/
  selectedCity(value: string): void {
    this.choseCity = value;
  }

  showGuestsContent(): void {
    if (this.showGuestCont) {
      this.showGuestCont = false;
    } else {
      this.showGuestCont = true;
    }
  }

  increaseGuestNumber(): void {
    this.numberOfGuest++;
  }

  decreaseGuestNumber(): void {
    if (this.numberOfGuest > 1) {
      this.numberOfGuest--;
    }
  }

  increaseRoomNumber(): void {
    this.numberOfRoom++;
  }

  decreaseRoomNumber(): void {
    if (this.numberOfRoom > 1) {
      this.numberOfRoom--;
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
