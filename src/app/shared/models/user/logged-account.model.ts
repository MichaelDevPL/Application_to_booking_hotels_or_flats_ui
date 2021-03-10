import {JwtToken} from '../../authentication/jwt-token.model';
import {BasicAccount} from './basic-account.model';

export class LoggedAccount {
  basicAccount: BasicAccount;
  jwtToken: JwtToken;
}
