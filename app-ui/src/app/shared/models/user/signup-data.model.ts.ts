import {BasicAccount} from './basic-account.model';
import {User} from './user.model';

export class SignupData {
  private accountData: BasicAccount;
  private userData: User;

  constructor(accountData: BasicAccount, userData: User) {
    this.accountData = accountData;
    this.userData = userData;
  }
}
