import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
let apiUrl = 'http://localhost/imabservice/api/v1/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
  
  login(credentials) {
	    return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');

	        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
	          .subscribe(res => {
	            resolve(res.json());
	          }, (err) => {
	            reject(err);
	          });
	    });
  };
  
  register(data) {
	    return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');

	        this.http.post(apiUrl+'guest/signup', JSON.stringify(data), {headers: headers})
	          .subscribe(res => {
	            resolve(res.json());
	          }, (err) => {
	            reject(err);
	          });
	    });
  };
  
  logout(){
	    return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('X-Auth-Token', localStorage.getItem('token'));

	        this.http.post(apiUrl+'logout', {}, {headers: headers})
	          .subscribe(res => {
	            localStorage.clear();
	          }, (err) => {
	            reject(err);
	          });
	    });
	};

}
