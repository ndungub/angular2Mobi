import { Component } from '@angular/core';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';

import { LoansPage } from '../loans/loans';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoansModel } from '../../model/loansModel';
/**
 * Generated class for the LoandetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loandetails',
  templateUrl: 'loandetails.html',
})
export class LoandetailsPage {
	loading: any;
	loanBalanceData = { mobileno:'' };
	activeLoan: any;
	loanPrincipal: number;
	loanInterest: number;
	loanTotal: number;
	monthlyRate: number;

	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
		this.getLoanDetails();
	};

	private getLoanDetails (): void {
		    this.showLoader('Checking loan balances ...');
		    let registerOperation:Observable<LoansModel>;

		    this.loading.present().then(() => {
		    	
		    	this.loanBalanceData['mobileno'] = this.shareService.getLoginSessionMobileNo();
		    	this.loanBalanceData['loanid'] = this.shareService.getDetailLoanId();
		    	
		    	let data = {data: this.loanBalanceData};
		    	
		    	registerOperation = this.loanService.getSingleLoanBalances(data);
		    	registerOperation.subscribe(
		    			response => {
		                	this.loading.dismiss();
		                	if(response.retcode == "000"){	
		                		
		                		this.activeLoan = response.results;
		                		this.activeLoan = this.activeLoan.find(x => x.loanid != null);
		                		
		                	
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
		                		this.showAlert(response.retmsg,"Vuqa");
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
	  this.nav.setRoot(LoansPage);
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
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoandetailsPage');
  }

}
