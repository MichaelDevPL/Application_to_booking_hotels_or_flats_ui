import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserPanelComponent} from './user-panel.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: 'user/:login', component: UserPanelComponent}
];

@NgModule({
  declarations: [
    UserPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: []
})
export class UserModule { }
