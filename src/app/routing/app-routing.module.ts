import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePanelComponent } from '../components/home-panel/home-panel.component';
import { LoginPanelComponent } from '../components/login-panel/login-panel.component';
import { SignupPanelComponent } from '../components/signup-panel/signup-panel.component';

const routes: Routes = [
  { path: 'home', component: HomePanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'signup', component: SignupPanelComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
