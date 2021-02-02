import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../shared/services/account.service';
import {BasicAccount} from '../../shared/models/user/basic-account.model';
import {ObjectUtils} from '../../util/object.utils';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {

  public accountData: BasicAccount;

  constructor(
    private accountService: AccountService,
    private auth: AuthenticationService,
  ) {
    this.getDataOfLoggedAccount();
  }

  ngOnInit(): void {
  }

  public isLoggedPanelVisible(): boolean {
    return !ObjectUtils.isDefined(this.accountData);
  }

  private getDataOfLoggedAccount(): void {
    this.accountService.getLoggedAccount()
      .subscribe(loggedAccount => this.accountData = loggedAccount);
  }
}
