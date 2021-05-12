import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../shared/services/account.service';
import {SharedDataService} from '../../../shared/services/shared-data.service';
import {User} from '../../../shared/models/user/user.model';
import {catchError, map, takeUntil} from 'rxjs/operators';
import {JwtManagerService} from '../../../shared/authentication/jwt-manager.service';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  public changingUserData = false;
  public userData: User;
  public isLoaded = false;
  private ngDestroy = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private shareData: SharedDataService,
    private userService: UserService
  ) {
    if (!(this.shareData.getLoggedAccount() === null) && JwtManagerService.getExpirationTimeValid()) {
      this.accountService.getUserByAccountId(this.shareData.getLoggedAccount().getValue().id)
        .pipe(
          takeUntil(this.ngDestroy),
          map(value => Object.assign(new User(), value))
        )
        .subscribe(value => {
            this.userData = value;
          }, error => console.log(error)
          , () => this.isLoaded = true);
    }
  }

  ngOnInit(): void {
  }

  onChangingData(): void {
    this.changingUserData = true;
  }

  onChangeEvent(event: any): any {
    return event.target.value;
  }

  cancelChange(): void {
    this.changingUserData = false;
  }

  save(): void {
    console.log(this.userData);
    this.userService.uploadUserData(this.userData).subscribe(
      value => {}
      , error => { console.log(error); }
      , () => { window.location.reload(); }
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
    this.ngDestroy.unsubscribe();
  }
}
