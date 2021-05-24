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

  private readonly UPLOAD_URL: string = '/upload';

  constructor(private sharedService: SharedDataService,
              private http: HttpCustomService,
              private router: Router,
              private https: HttpClient) {
  }


  public multiplesFilesUpload(data: Array<File>, city: string): Observable<HttpEvent<{}>> {

    const url: string = 'api' + this.UPLOAD_URL + '/upload-multiple-files/' +
      this.sharedService.getLoggedAccount().getValue().id + '/' + city;

    const formData = new FormData();

    Array.from(data).forEach(file => {
      formData.append('files', file);
    });

    const newRequest = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this.https.request(newRequest);
  }

  public loadImage(path: string): string{
    return '/api' + this.UPLOAD_URL + '/download?filePath=' + path;
  }

  public deleteStoredImage(path: string): void{
    const url: string = this.UPLOAD_URL + '/delete-image/' + path;

    this.http.delete(url).subscribe();
  }

}
