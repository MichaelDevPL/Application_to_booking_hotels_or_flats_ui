import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../shared/services/account.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {BasicAccount} from '../../shared/models/user/basic-account.model';
import {ObjectUtils} from '../../util/object.utils';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnDestroy {

  public accountData: BasicAccount;
  private ngDestroy = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private auth: AuthenticationService,
  ) {
    this.getDataOfLoggedAccount();
  }

  public isLoggedPanelVisible(): boolean {
    return !ObjectUtils.isDefined(this.accountData);
  }

  private getDataOfLoggedAccount(): void {
    this.accountService.getLoggedAccount()
      .pipe(
        takeUntil(this.ngDestroy)
      )
      .subscribe(loggedAccount => this.accountData = loggedAccount);
  }

  public signOut(): void{
    this.auth.sighOut();
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
    this.ngDestroy.unsubscribe();
  }
}

