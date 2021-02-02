import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SharedDataService} from './shared-data.service';
import {HttpCustomService} from '../../util/http-custom.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private readonly UPLOUD_URL: string = '/upload';

  constructor(private sharedService: SharedDataService,
              private http: HttpCustomService,
              private router: Router,
              private https: HttpClient) {
  }


  public multiplesFilesUpload(data: Array<File>, city: string): Observable<HttpEvent<{}>> {

    const url: string = 'api/' + this.UPLOUD_URL + '/upload-multiple-files/' +
      this.sharedService.getLoggedAccount().getValue()._id + '/' + city;

    const formData = new FormData();

    Array.from(data).forEach(file => {
      formData.append('files', file);
    });

    const newRequest = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this.https.request(newRequest);
  }
}
