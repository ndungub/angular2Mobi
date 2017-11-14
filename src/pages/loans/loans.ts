import { Component } from '@angular/core';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoanapplicationPage } from '../loanapplication/loanapplication';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoanApplicationModel } from '../../model/loanApplicationModel';
/**
 * Generated class for the LoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loans',
  templateUrl: 'loans.html',
})
export class LoansPage {
	loading: any;
	loanBalance: any;
	loanBalanceData = { mobileno:'' };
	hasBalance: boolean = false;
	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
	
	};

 private getLoanBalances(): void {
	    this.showLoader('Checking loan balances ...');
	    let registerOperation:Observable<LoanApplicationModel>;

	    this.loading.present().then(() => {
	    	
	    	this.loanBalanceData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    	let data = {data: this.loanBalanceData};
	    	
	    	registerOperation = this.loanService.getLoanBalances(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		/*this.shareService.setLoanid(response.results.loanid);
	                		this.shareService.setLoanamount(response.results.loanamount);
	                		this.shareService.setLoanstatus(response.results.loanstatus);
	                		this.shareService.setDisbursedon(response.results.disbursedon);
	                		this.shareService.setLoanbalance(response.results.loanbalance);
	                		this.shareService.setNextInstallmentDate(response.results.nextinstallmentdate);
	                		*/
	                	}else{
	                		
	                		this.nav.setRoot(LoanapplicationPage);
	                	}
	                }, 
	                err => {
	                    // Log errors if any
	                	this.showAlert(err,"Vuqa");
	                    this.loading.dismiss();
	        });
	    });
	};
  public loansBack() {
		this.nav.setRoot(HomePage);
  };

  showLoader(msg){
	    this.loading = this.loadingCtrl.create({
	        content: msg
	    });

	    this.loading.present();
  };
  showAlert(msg,title) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: msg,
	    buttons: ['Dismiss']
	  });
	  alert.present();
};  
  toNum (num): number{
	  num  = Math.round(num);
	  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
 }

}
