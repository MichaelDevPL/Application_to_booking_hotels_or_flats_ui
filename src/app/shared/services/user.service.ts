import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {User} from '../models/user/user.model';
import {Observable} from 'rxjs';
import {UserContactDataModel} from '../models/rental/user-contact-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_URL: string = '/user';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
  ) {
  }

  public uploadUserData(user: User): Observable<void> {
    const url: string = this.USERS_URL + '/upload';

    return this.http.post(url, user);
  }

  public userContactData(accountId: bigint): Observable<UserContactDataModel> {
    const url: string = this.USERS_URL + '/contact-data/' + accountId;

    return this.http.get(url);
  }

}
