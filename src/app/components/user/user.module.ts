import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserPanelComponent} from './user-panel.component';
import {FormsModule} from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountBookingsComponent } from './account-bookings/account-bookings.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';
import { AccountHistoryComponent } from './account-history/account-history.component';

const routes: Routes = [
  {path: 'account', component: UserPanelComponent,
    children: [
      {path: 'settings', component: AccountSettingsComponent},
      {path: 'bookings', component: AccountBookingsComponent},
      {path: 'reviews', component: AccountReviewsComponent},
      {path: 'history', component: AccountHistoryComponent},
    ]},
];

@NgModule({
  declarations: [
    UserPanelComponent,
    AccountSettingsComponent,
    AccountBookingsComponent,
    AccountReviewsComponent,
    AccountHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: []
})
export class UserModule { }
