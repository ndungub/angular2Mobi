import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { LoanApplicationModel } from '../../model/loanApplicationModel';
import { LoansModel } from '../../model/loansModel';

//Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LoanServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
let apiUrl = 'http://localhost/imabservice/vuqa/api/v1/index.php/';
//let apiUrl = 'https://demoapp.imab.co.ke/vuqa/api/v1/';


@Injectable()
export class LoanServiceProvider {
 paymentData:any = {};
  constructor(public http: Http) {
    console.log('Hello LoanServiceProvider Provider');
  }

  getLoanBalances (body: Object): Observable<LoansModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloancustomerloans', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
  getSingleLoanBalances (body: Object): Observable<LoansModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 

      return this.http.post(apiUrl+'mloancustomersingleloan', body, options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
  
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

  payLoan (body: any): Observable<LoanApplicationModel> {
      let bodyString = JSON.stringify(body); 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', '07e99e74-801c-11e7-b2c7-ac162d475b5d');
      
      let options = new RequestOptions({ headers: headers }); 
      
      let url = "https://www.volticpaymentgateway.com/src/integration/paymentrequest/";

      this.paymentData["amount"] = body.data.paymentamount;
      this.paymentData["cashier_name"] = "IMAB";
      this.paymentData["booking_ref"] = Math.floor(Math.random() * (900000000 - 999999999 + 1)) + 999999999;
      this.paymentData["mobile_no"] = body.data.mobileno;
      this.paymentData["route_name"] = "Nairobi";
      this.paymentData["token"] = "HMV2G190EIB";
      
      
      //let data = {data: this.paymentData};

      return this.http.post(url, JSON.stringify(this.paymentData) , options) 
                       .map((res:Response) =>
                       		res.json())
                       .catch((error:any) => 
                       		Observable.throw(
                       				error.json().error || 'Server error'
                       		));
  };
}
