import {Component} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {JwtManagerService} from './shared/authentication/jwt-manager.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {ObjectUtils} from './util/object.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading = false;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);

      if (routerEvent instanceof NavigationStart && ObjectUtils.isDefined(JwtManagerService.getNickFromToken())
        && JwtManagerService.allowToRefreshToken()){
          console.log('token has been refreshed');
          this.auth.refreshToken();
        }

      if (routerEvent instanceof NavigationStart && ObjectUtils.isDefined(JwtManagerService.getNickFromToken())
        && !JwtManagerService.getExpirationTimeValid()){
        console.log('clean token');
        this.auth.sighOut();
      }
    });
  }

  public checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}
