import {AccountRole} from '../../enums/account-role.enum';

export class BasicAccount{
  id?: bigint;
  login: string;
  password?: string;
  role: AccountRole;
  questionToRemindPassword?: string;
  answerToRemindPassword?: string;
}
