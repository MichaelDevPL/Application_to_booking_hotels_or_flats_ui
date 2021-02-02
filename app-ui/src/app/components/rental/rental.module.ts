import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RentalListComponent} from './rental-list/rental-list.component';
import {RentalDetailComponent} from './rental-detail/rental-detail.component';
import {RentalComponent} from './rental.component';
import {RentalListItemComponent} from './rental-list-item/rental-list-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RentalCreateComponent } from './rental-create/rental-create.component';

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
    RentalCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class RentalModule { }
