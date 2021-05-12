import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RentalListComponent} from './rental-list/rental-list.component';
import {RentalDetailComponent} from './rental-detail/rental-detail.component';
import {RentalComponent} from './rental.component';
import {RentalListItemComponent} from './rental-list-item/rental-list-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GalleryCarouselComponent } from './rental-detail/gallery-carousel/gallery-carousel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { OffersOderByPipe } from './pipes/offers-oder-by.pipe';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {path: 'rentals', component: RentalComponent,
    children: [
      {path: '', component: RentalListComponent},
      {path: ':id', component: RentalDetailComponent}
    ]},
  {path: 'rental-create', component: RentalCreateComponent}
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalComponent,
    RentalCreateComponent,
    GalleryCarouselComponent,
    OffersOderByPipe
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        NgbModule,
        ScrollingModule,
        MatSelectModule
    ],
  providers: []
})
export class RentalModule { }
