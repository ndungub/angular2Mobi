import { Component, ViewChild } from '@angular/core';
import {  App, MenuController, Nav, Platform, AlertController,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LoanapplicationPage } from '../pages/loanapplication/loanapplication';
import { ChangePinPage } from '../pages/change-pin/change-pin';
import { LoansPage } from '../pages/loans/loans';
import { PaymentsPage } from '../pages/payments/payments';
import { EvaluationPage } from '../pages/evaluation/evaluation';
import { PhotouploadPage } from '../pages/photoupload/photoupload';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../providers/share-service/share-service';
import { LoanServiceProvider } from '../providers/loan-service/loan-service';

import { LoanApplicationModel } from '../model/loanApplicationModel';
import { LoansModel } from '../model/loansModel';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../model/requestModel';

//Events
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private app: App;
  navigatePages
  otherPages
  accountPages
  rootPage:any = LoginPage;
  private menu: MenuController;
  //private authService: AuthServiceProvider;
  //private shareService: ShareServiceProvider;
  private loadingCtrl: LoadingController;
  private alertCtrl: AlertController;
  loading: any;
  
  menuFullNames: string;
  menuMedal: string;
  

  constructor(platform: Platform, menu: MenuController, alertCtrl: AlertController, loadingCtrl: LoadingController, public authService: AuthServiceProvider,public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
   
	  platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu = menu;
      this.alertCtrl = alertCtrl;
      this.loadingCtrl = loadingCtrl;
      //this.authService = authService;
      
      
      
      
      this.navigatePages = [
        			{ title: 'Home', component: HomePage, icon: 'home', name: 'homepage' },
        			{ title: 'Evaluation', component: EvaluationPage, icon: 'pie', name: 'evaluationpage' },
        			{ title: 'Apply Now', component: LoanapplicationPage, icon: 'medal', name: 'loanapplicationpage' },
        			{ title: 'Loans', component: LoansPage, icon: 'medal', name: 'loanspage' },
        			{ title: 'Payments', component: PaymentsPage, icon: 'cash', name: 'paymentspage' }
       ];
      this.otherPages = [
                			{ title: 'Support', component: HomePage, icon: 'settings', name: 'supportpage' },
                			{ title: 'About Us', component: HomePage, icon: 'information-circle', name: 'aboutuspage' }
               ];
      this.accountPages = [
             			{ title: 'Change PIN', component: ChangePinPage, icon: 'key', name: 'changepinpage' },
             			{ title: 'Sign Out', component: HomePage, icon: 'log-out', name: 'signoutpage' }
            ];
      
    });
	  
      events.subscribe('sharedServices', (data) => {
    	  this.menuFullNames = data.fullNames;
    	  this.menuMedal = data.medal;  
      });
  }
  
  openPage(page) {
	  if(page.name == 'supportpage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else if(page.name == 'aboutuspage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else if(page.name == 'signoutpage'){
		  this.nav.setRoot(LoginPage);
	  }else{
		  if(page.name == 'loanapplicationpage' || page.name == 'paymentspage'){
			  this.getActiveloan(page);
		  }else if(page.name == 'evaluationpage'){
			  this.viewEvaluation(page);
		  }else{
			  this.nav.setRoot(page.component);
		  }
		  
		  
		  
	  }
	   
	  this.menu.close();
  };
  
  viewEvaluation(page) {
	  let loading = this.loadingCtrl.create({
		    spinner: 'bubbles',
		    content: 'Evaluating Please Wait...'
		  });

		  loading.present();

		  setTimeout(() => {
			  this.nav.setRoot(page.component);
			  loading.dismiss();
		  }, 5000);
	  	
  }

  UploadPhoto() {
	  this.nav.setRoot(PhotouploadPage); 
	  this.menu.close();
  };
  
 //get loan balance 
	private getActiveloan (page): void {
		
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
	                		
	                		if(page.name == 'paymentspage'){
	                			if(activeLoan.loanstatus == '3'){
	                				this.nav.setRoot(page.component);
	                			}else{
	                				this.showAlert("You don't have an active loan for payment","Vuqa");
	                			}
	                			return;
	                		}
	                		if(activeLoan.loanstatus == '3'){
	                			this.showAlert("You have an existing loan of " + this.toNum(activeLoan.loanbalance),"Vuqa");
	                		}else if(this.shareService.getEligibleAmount() == 0){
	                			this.showAlert("You are not eligible to borrow with vuqa","Vuqa");
	                			
	                		}else{
	                			this.nav.setRoot(page.component);
	                		}
	                	}else{
	                		if(response.retcode == "003"){
	                			if(this.shareService.getEligibleAmount() == 0){
		                			this.showAlert("You are not eligible to borrow with vuqa","Vuqa");
		                			
		                		}else{
		                			this.nav.setRoot(page.component);
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

  
  logout() {
	    this.showLoader('Logging out.....');
	    let registerOperation:Observable<RequestModel>;
	    
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.logout();
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	localStorage.clear();
	                	let navi = this.app.getRootNav();
	                	navi.setRoot(LoginPage);

	                }, 
	                err => {
	                    // Log errors if any
	                	this.showAlert("Error loggin out","Vuqa");
	                    this.loading.dismiss();
	        });
	    });
	    
};
toNum (num): number{
	  num  = Math.round(num);
	  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

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
}

