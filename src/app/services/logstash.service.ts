import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Constants } from '../app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogstashService {

  currentUser: any;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  private createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', this.currentUser.token + ':' + this.currentUser.key);
    headers.append('Content-Type', 'application/json');
  }

  public getFilesAdmin() {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    // let options = new RequestOptions({ headers: headers });
    const options = {
      headers: headers
    }
    let fullUrl = window["config"]["AOD_API_ADMIN_BASE_URL"] + Constants.SERVER_API_LINK_ADMIN_LOGSTASH;
    return this.http.get(fullUrl, options).pipe(map((res) => {
      return res;
    }));
  }
}
