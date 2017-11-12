import { Component, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Amounts} from './interface/interface';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoanApplicationModel } from '../../model/loanApplicationModel'
/**
 * Generated class for the LoanapplicationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loanapplication',
  templateUrl: 'loanapplication.html',
})
export class LoanapplicationPage {
	loading: any;
	selectedLoanAmount: any;
	selectedLoanPeriod: any;
	loanamounts: Amounts[] = [];
	loanperiods: Periods[] = [];
	loanapplicationData = { loanamount:'', loanperiod:'' };


	    
	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController,private ref: ChangeDetectorRef) {
		this.getLoanProducts();
	};


	private getLoanProducts(): void {
	    this.showLoader('Loading ...');
	    let registerOperation:Observable<LoanApplicationModel>;

	    this.loading.present().then(() => {
	    	registerOperation = this.loanService.getLoanProducts();
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.loadLoanAmount(this.shareService.getEligibleAmount(),response.results.maxloanterm);
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
	
	doLoanApplication(form: NgForm) {
	    if (form.valid) {
		    this.showLoader('Calculating repayments ...');
		    let registerOperation:Observable<LoanApplicationModel>;
		    
		    
		    this.loanapplicationData['loanamount'] = this.selectedLoanAmount.loanamount;
		    this.loanapplicationData['loanperiod'] = this.selectedLoanPeriod.periodNum;
		    
		    let data = {data: this.loanapplicationData};
		    this.loading.present().then(() => {
		    	registerOperation = this.loanService.verifyLoanApplication(data);
		    	registerOperation.subscribe(
		    			response => {
		                	this.loading.dismiss();
		                	if(response.retcode == "000"){
		                		
		                		let msg = "Confirm loan application of KSh "
		                			+ this.selectedLoanAmount.loanamount
		                			+ " payable to "
		                			+ this.shareService.getFullNames()
		                			+ ". "
		                			+ "Ksh " 
		                			+ response.results.interestamount 
		                			+" service fee will be deducted. "
		                			+ "Ksh " 
		                			+ response.results.takehome 
		                			+ " will be sent to your MPESA."
		                			+"You loan due date is " 
		                			+ response.results.duedate;
		                			
		                			
		                		this.presentLoanApplicationConfirm(msg);
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
		  }
	};
			
	private applyLoan() {
	    this.showLoader('Applying loan ...');
	    let registerOperation:Observable<LoanApplicationModel>;
	    
	    this.loanapplicationData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    this.loanapplicationData['loanamount'] = this.selectedLoanAmount.loanamount;
	    this.loanapplicationData['loanperiod'] = this.selectedLoanPeriod.periodNum;
	    
	    
	    let data = {data: this.loanapplicationData};
	    this.loading.present().then(() => {
	    	registerOperation = this.loanService.applyLoan(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.showAlert(response.retmsg,"Vuqa");
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
	private loadLoanAmount(ceilAmount, loanperiod) {
		  let obj = <Amounts>{}
		  let NumOfLoops = Math.floor(ceilAmount / 500);
		  
		  for(let i= 1; i<=NumOfLoops; i++) {
			  let loanDenomanation = i * 500;
		    this.loanamounts.push({loanamountIndex: i, loanamount: loanDenomanation});
		  }
		  
		  for(let i= 1; i<=loanperiod; i++) {
			    this.loanperiods.push({periodIndex: i, periodNum: i});
		  }
	    };
	    
  public loanapplicationBack() {
		this.nav.setRoot(HomePage);
  };
  
  public optionsLoanAmount(item): void { 
	    console.log();
	  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanapplicationPage');
  }

  presentLoanApplicationConfirm(msg) {
	  let alert = this.alertCtrl.create({
	    title: 'Confirm Loan Application',
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
	        	this.applyLoan();
	        }
	      }
	    ]
	  });
	  alert.present();
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

}
export interface Periods {
	periodIndex: number;  
    periodNum : number;
}

