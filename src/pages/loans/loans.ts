import { Component } from '@angular/core';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoanapplicationPage } from '../loanapplication/loanapplication';
import { LoandetailsPage } from '../loandetails/loandetails';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoanApplicationModel } from '../../model/loanApplicationModel';
import { LoansModel } from '../../model/loansModel';

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
	loanBalanceData = { mobileno:'' };
	loans: any;
	
	activeLoan: any;
	
	loanBalance: number;
	loanPrincipal: number;
	loanInterest: number;
	loanTotal: number;
	monthlyRate: number;
	hasBalance: boolean = false;
	
	
	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
		this.getLoanBalances();
	};

 private getLoanBalances(): void {
	    this.showLoader('Checking loan balances ...');
	    let registerOperation:Observable<LoansModel>;

	    this.loading.present().then(() => {
	    	
	    	this.loanBalanceData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    	let data = {data: this.loanBalanceData};
	    	
	    	registerOperation = this.loanService.getLoanBalances(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.loans = response.results;
	                		this.loans = this.loans.sort((a,b) => b.loanid - a.loanid);
	                		this.activeLoan = this.loans.find(x => x.loanstatus == 3);
	                		
	                		if(this.activeLoan != null){
	                			this.hasBalance = true;
	                		}else{
	                			this.hasBalance = false;
	                		}
	                		
	                		
	                		this.loanBalance = this.toNum(this.activeLoan.loanbalance);
	                		this.loanPrincipal = this.toNum(this.activeLoan.loanamount);
	                		this.loanInterest = this.toNum(this.activeLoan.loaninterest);
	                		this.loanTotal = this.toNum(this.activeLoan.totalamount);
	                		this.monthlyRate = parseFloat(this.activeLoan.loanrate);
	                		
	                		this.shareService.setLoanid(this.activeLoan.loanid);
	                		this.shareService.setLoanamount(this.activeLoan.loanamount);
	                		this.shareService.setLoanstatus(this.activeLoan.loanstatus);
	                		this.shareService.setDisbursedon(this.activeLoan.disbursedon);
	                		this.shareService.setLoanbalance(this.activeLoan.loanbalance);
	                		this.shareService.setNextInstallmentDate(this.activeLoan.nextinstallmentdate);
	                		this.shareService.setIsactive(this.activeLoan.isactive);
	                		this.shareService.setLoanTerm(this.activeLoan.loanterm);
	                		this.shareService.setLoanRate(this.activeLoan.loanrate);
	                		this.shareService.setTotalAmount(this.activeLoan.totalamount);
	                		this.shareService.setLoanInterest(this.activeLoan.loaninterest);
	                		
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
	

  public getLoanDetails(loan): void{
	  this.shareService.setDetailLoanId(loan.loanid)
	  this.nav.setRoot(LoandetailsPage);
  }
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
