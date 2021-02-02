import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {

  private readonly SERVER_PROXY = '/api';

  constructor(private http: HttpClient) {
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(this.SERVER_PROXY + url, body);
  }

  public get(url: string): Observable<any> {
    return this.http.get(this.SERVER_PROXY + url);
  }

  public put(url: string, body: any): Observable<any> {
    return this.http.put(this.SERVER_PROXY + url, body);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.SERVER_PROXY + url);
  }
}
