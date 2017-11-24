import { Component } from '@angular/core';
import { App, NavController, Nav, LoadingController, ToastController,AlertController } from 'ionic-angular';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


import { LoginPage } from '../login/login';
import { EvaluationPage } from '../evaluation/evaluation';
import { LoanapplicationPage } from '../loanapplication/loanapplication';
import { LoansPage } from '../loans/loans';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { LoanServiceProvider } from '../../providers/loan-service/loan-service';
import { LoansModel } from '../../model/loansModel';

import {Observable} from 'rxjs/Rx';

//Events
import { Events } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loading: any;
  isLoggedIn: boolean = false;
  qualifiedAmout:any;
  currentMedal: string;
  medalPath: string;
  eligibilityStatus: string;
  canApply: boolean = true;
  
  constructor(public app: App, public navCtrl: NavController,  public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider,public loanService: LoanServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController, public events: Events) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    this.onLoginIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  onLoginIn() {
	  this.events.publish('sharedServices',this.shareService);
	  
	  this.qualifiedAmout = this.toNum(this.shareService.getLoanLimit());
	  if(this.shareService.getEligibleAmount() > 0){
		  this.eligibilityStatus = "You are eligible to borrow up to " + this.toNum(this.shareService.getEligibleAmount());
	  }else{
		  this.getActiveloan();
		  
	  }
	  
	  this.currentMedal = this.shareService.getMedal();
	  this.medalPath = "assets/images/"  + this.shareService.getMedal().toLowerCase() + ".png";
  };

  //get loan balance 
	private getActiveloan (): void {
		
	    this.showLoader('Checking loan status ...');
	    let registerOperation:Observable<LoansModel>;

	    this.loading.present().then(() => {
	    	let loanBalanceData: any ={};
	    
	    	loanBalanceData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    	loanBalanceData['loanstatus'] = 3;
	    	
	    	let data = {data: loanBalanceData};
	    	
	    	registerOperation = this.loanService.getActiveLoan(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){	
	                		let loans: any =  response.results;
	                		loans = loans.sort((a,b) => b.loanid - a.loanid);
	                		let activeLoan: any = loans.find(x => x.loanstatus == 3);
	                	
	                		if(activeLoan.loanstatus == '3'){
	                			this.canApply = false;
	                			this.eligibilityStatus = "You have an existing loan of " + this.toNum(activeLoan.loanbalance);
	                		}
	                	}else{
	                		if(response.retcode == "003"){
	                			if(this.shareService.getEligibleAmount() == 0){
	                				this.canApply = false;
	                				this.eligibilityStatus = "You are not eligible to borrow with vuqa";	
		                		}
	                		}else{
	                			this.showAlert(response.retmsg,"Vuqa");
	                		}
	                		
	                	}
	                }, 
	                err => {
	                    // Log errors if any
	                	this.showAlert(err,"Vuqa");
	                    this.loading.dismiss();
	        });
	    });
	};
	
  showLoader(msg){
    this.loading = this.loadingCtrl.create({
        content: msg
    });

    this.loading.present();
  }
  showAlert(msg,title) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: msg,
	    buttons: ['Dismiss']
	  });
	  alert.present();
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
  }

  viewEvaluation() {
	  let loading = this.loadingCtrl.create({
		    spinner: 'bubbles',
		    content: 'Evaluating Please Wait...'
		  });

		  loading.present();

		  setTimeout(() => {
			  this.nav.setRoot(EvaluationPage);
			  loading.dismiss();
		  }, 5000);
	  	
  }
  viewLoanApplication() {
	  	this.nav.setRoot(LoanapplicationPage);
  }
  
  toNum (num): number{
	  num  = Math.round(num);
	  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
}
