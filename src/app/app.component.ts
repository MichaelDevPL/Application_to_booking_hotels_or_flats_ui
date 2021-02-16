import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ObjectUtils} from './util/object.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lastSavePathBeforeReloadPage: string;

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.lastSavePathBeforeReloadPage = val.url;
      }
    });
  }

  ngOnInit(): void {
    const lastSavePath = localStorage.getItem('lastPath');
    if (ObjectUtils.isDefined(lastSavePath)) {
      this.router.navigate([lastSavePath]);
      localStorage.removeItem('lastPath');
    }
  }

  @HostListener('window:beforeunload')
  async onDestroy(): Promise<void>{
    localStorage.setItem('lastPath', this.lastSavePathBeforeReloadPage);
  }
}
