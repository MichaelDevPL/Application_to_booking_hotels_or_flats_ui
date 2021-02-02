import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_URL: string = '/users';

  constructor(
    private sharedService: SharedDataService,
    private http: HttpCustomService,
    private router: Router
  ) {}

}
