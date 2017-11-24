import { Component, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';


//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoanApplicationModel } from '../../model/loanApplicationModel';
import { LoansModel } from '../../model/loansModel';

/**
 * Generated class for the PaymentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  loading: any;
  paymentData = { paymentamount:'' };
  loanBalance: any;
  activeLoan: any;
  
  constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController,private ref: ChangeDetectorRef) {
		this.getLoanDetails();
	};

	private getLoanDetails (): void {
	    this.showLoader('Checking active loan ...');
	    let registerOperation:Observable<LoansModel>;

	    this.loading.present().then(() => {
	    	
	    	this.paymentData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    	this.paymentData['loanstatus'] = 3;
	    	
	    	let data = {data: this.paymentData};
	    	
	    	registerOperation = this.loanService.getActiveLoan(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){	
	                		
	                		this.activeLoan = response.results;
	                		this.activeLoan = this.activeLoan.find(x => x.loanid != null);	                	
	                		this.loanBalance = this.toNum(this.activeLoan.loanbalance);
	                		
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
  submitPayment() {
		    this.showLoader('Submitting payment ....');
		   
		    let registerOperation:Observable<LoanApplicationModel>;
		    
		    this.paymentData['mobileno'] = this.shareService.getLoginSessionMobileNo();
		    let data = {data: this.paymentData};
		    this.loading.present().then(() => {
		    	registerOperation = this.loanService.payLoan(data);
		    	registerOperation.subscribe(
		    			response => {
		                	this.loading.dismiss();
		                	if(response.retcode == "000"){
		                		this.nav.setRoot(HomePage);
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
	
	doPayments(form: NgForm) {
	  if (form.valid) {
		  let msg = "Confirm loan payment of KSh "
				+ this.paymentData.paymentamount
				+ "?";
		  
		  let alert = this.alertCtrl.create({
		    title: 'Confirm Loan Payment',
		    message: msg,
		    buttons: [
		      {
		        text: 'Cancel',
		        role: 'cancel',
		        handler: () => {
		          console.log('Cancel clicked');
		        }
		      },
		      {
		        text: 'Apply',
		        handler: () => {
		        	//this.showAlert("We could but let's not!","Vuqa");
		        	this.submitPayment();
		        }
		      }
		    ]
		  });
		  alert.present();
	  }
  };
  public paymentsBack() {
		this.nav.setRoot(HomePage);
  };
  showLoader(msg){
	    this.loading = this.loadingCtrl.create({
	        content: msg
	    });

	    this.loading.present();
  };

	presentToast(msg) {
			    let toast = this.toastCtrl.create({
			      message: msg,
			      duration: 3000,
			      position: 'bottom',
			      dismissOnPageChange: true
			    });
	
			    toast.onDidDismiss(() => {
			      console.log('Dismissed toast');
			    });
	
			    toast.present();
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
