import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { LoanApplicationModel } from '../../model/loanApplicationModel';

//Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LoanServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

let apiUrl = 'http://localhost/imabservice/vuqa/api/v1/';

@Injectable()
export class LoanServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LoanServiceProvider Provider');
  }
  
  getLoanProducts (): Observable<LoanApplicationModel> {
      
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanproductsettings', '', options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };

  verifyLoanApplication (body: Object): Observable<LoanApplicationModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanloanenquiry', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  applyLoan (body: Object): Observable<LoanApplicationModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloanloanapplication', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
}
