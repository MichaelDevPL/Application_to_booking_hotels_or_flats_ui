import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {User} from '../models/user/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_URL: string = '/user';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
    private router: Router
  ) {
  }

  public uploadUserData(user: User): Observable<void> {
    const url: string = this.USERS_URL + '/upload';

    return this.http.post(url, user);
  }

}
