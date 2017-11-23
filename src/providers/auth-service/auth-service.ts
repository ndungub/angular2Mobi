import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { RequestModel } from '../../model/requestModel';

//Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import CryptoJS from 'crypto-js';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

let apiUrl = 'http://localhost/imabservice/vuqa/api/v1/index.php/';

//let apiUrl = 'https://demoapp.imab.co.ke/vuqa/api/v1/';

@Injectable()
export class AuthServiceProvider {
	private progress$: Observable<number>;
	private progress: number = 0;
	private progressObserver: any;

  constructor(public http: Http) {
	  /*this.progress$ = new Observable(observer => {
	        this.progressObserver = observer
	  });*/
	  this.progress$ = Observable.create(observer => {
	        this.progressObserver = observer
	    }).share();
  }
  

  sendLoginOPT (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloansignin', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };

  validateLoginOPT (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloansigninvalidateotp', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  sendForgotPinOTP (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanresetpindetails', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  validateSendForgotPinOTP (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanresetpinvalidateotp', body, options) 
               .map((res:Response) =>
               		res.json())
               .catch((error:any) => 
               		Observable.throw(
               				error.json().error || 'Server error'
               		));
  };
  
  resetForgotPIN (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanresetpin', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };

  changePIN (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanchangepin', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };

  firstTimeChangePIN (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanfirsttimesetpin', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
   
  sendRegisterOTP (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.post(apiUrl+'mloansubscribe', body, options) // ...using post request
                       .map((res:Response) =>
                       		res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		)); //...errors if any
  };

  validateRegisterOTP (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanvalidatesubscribeotp', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  validateRegisterBIO (body: Object): Observable<RequestModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanregistercustomer', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  makeFileUpload (imageBlob: any, id: string, destImage: string): Observable<RequestModel> {
	     return Observable.create(observer => {
	         let url = apiUrl + "mobilefileupload/"+ id +"/"+ destImage;         
	         let formData: FormData = new FormData(),
	                xhr: XMLHttpRequest = new XMLHttpRequest();
	         
	          let fileOfBlob = new File([imageBlob], id);
	          formData.append('file', imageBlob,id);

	            xhr.onreadystatechange = () => {
	                if (xhr.readyState === 4) {
	                    if (xhr.status === 200) {
	                        observer.next(JSON.parse(xhr.response));
	                        observer.complete();
	                    } else {
	                        observer.error(xhr.response);
	                    }
	                }
	            };

	            AuthServiceProvider.setUploadUpdateInterval(500);
	            xhr.upload.onprogress = (event) => {
	                this.progress = Math.round(event.loaded / event.total * 100);

	                //this.progressObserver.next(this.progress);
	                
	               
	            };

	            xhr.open('POST', url, true);
	            xhr.send(formData);
	            
	        });
  };
  public getObserver (): Observable<number> {
		    return this.progress$;
  };
  private static setUploadUpdateInterval (interval: number): void {
		    setInterval(() => {}, interval);
  };
 
  encryptSalt (toEncrypt: string) : Object {
		  "use strict";
		      let salt = CryptoJS.lib.WordArray.random(128 / 8);
		      let key256Bits500Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 256 / 32, iterations: 500 });
		      let iv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f'); // just chosen for an example, usually random as well

		      let encrypted = CryptoJS.AES.encrypt(toEncrypt, key256Bits500Iterations, { iv: iv });
		      let data_base64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
		      let iv_base64 = encrypted.iv.toString(CryptoJS.enc.Base64);
		      let key_base64 = encrypted.key.toString(CryptoJS.enc.Base64);

		      data_base64 = encodeURIComponent(data_base64).replace(/[!'()]/g,'').replace(/\*/g, "%2A");
		      iv_base64 = encodeURIComponent(iv_base64).replace(/[!'()]/g,'').replace(/\*/g, "%2A");
		      key_base64 = encodeURIComponent(key_base64).replace(/[!'()]/g,'').replace(/\*/g, "%2A");

		      
		      let data = {};
		      data['encrypted'] = data_base64;
		      data['iv'] = iv_base64;
		      data['key'] = key_base64;

		      return data;
		 
	  
  };
  
  logout(): Observable<RequestModel> {
      let headers = new Headers({ 'Content-Type': 'application/json','X-Auth-Token': localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'logout','', options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
	    /*return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('X-Auth-Token', localStorage.getItem('token'));

	        this.http.post(apiUrl+'logout', {}, {headers: headers})
	          .subscribe(res => {
	            localStorage.clear();
	          }, (err) => {
	            reject(err);
	          });
	    });*/
	};

}
