import {AccountRole} from '../../enums/account-role.enum';

export class BasicAccount{
  private id?: number;
  private login: string;
  private password?: string;
  private role: AccountRole;

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _login(): string {
    return this.login;
  }

  set _login(value: string) {
    this.login = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  get _role(): AccountRole {
    return this.role;
  }

  set _role(value: AccountRole) {
    this.role = value;
  }
}
