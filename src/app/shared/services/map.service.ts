import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private apiKey = 'mALVFr1sYWBc0U0K-DqKVBn96ZebsQGGjifs72fgGvU';

  constructor(private http: HttpClient) {
  }

  public getAddress(value: string): Observable<any> {

    let url = '/map/6.2/suggest.json?' +
      'apiKey=' +
      this.apiKey +
      '&resultType=label' +
      '&language=en' +
      '&query=' +
      value;

    return this.http.get(url);
  }
}
