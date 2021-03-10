import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private apiKey = 'mALVFr1sYWBc0U0K-DqKVBn96ZebsQGGjifs72fgGvU';
  private httpClient: HttpClient;

  constructor( handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  public getAddress(value: string): Observable<object> {
    const url = '/map/6.2/suggest.json?' +
      'apiKey=' +
      this.apiKey +
      '&resultType=label' +
      '&language=en' +
      '&query=' + value;

    return this.httpClient.get(url);
  }
}
