import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPanelComponent } from './components/header-panel/header-panel.component';
import { HomePanelComponent } from './components/home-panel/home-panel.component';
import { AccountService } from './shared/services/account.service';
import { UserService } from './shared/services/user.service';
import { HttpCustomService } from './util/http-custom.service';
import { SharedDataService } from './shared/services/shared-data.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { SignupPanelComponent } from './components/signup-panel/signup-panel.component';
import { JwtInterceptorService } from './shared/authentication/jwt-interceptor.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RentalModule } from './components/rental/rental.module';
import { UserModule } from './components/user/user.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPanelComponent,
    HomePanelComponent,
    LoginPanelComponent,
    SignupPanelComponent
  ],
  imports: [
    RentalModule,
    UserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [
    AccountService,
    UserService,
    HttpCustomService,
    SharedDataService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
