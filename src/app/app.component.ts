import { Component, ViewChild } from '@angular/core';
import {  App, MenuController, Nav, Platform, AlertController,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LoanapplicationPage } from '../pages/loanapplication/loanapplication';
import { ChangePinPage } from '../pages/change-pin/change-pin';
import { LoansPage } from '../pages/loans/loans';
import { EvaluationPage } from '../pages/evaluation/evaluation';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../providers/share-service/share-service';

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
  private authService: AuthServiceProvider;
  private shareService: ShareServiceProvider;
  private loadingCtrl: LoadingController;
  private alertCtrl: AlertController;
  loading: any;
  
  menuFullNames: string;
  menuMedal: string;

  constructor(platform: Platform, menu: MenuController, alertCtrl: AlertController, loadingCtrl: LoadingController, authService: AuthServiceProvider, shareService: ShareServiceProvider, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
   
	  platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu = menu;
      this.alertCtrl = alertCtrl;
      this.loadingCtrl = loadingCtrl;
      this.authService = authService;
      
      
      
      
      this.navigatePages = [
        			{ title: 'Home', component: HomePage, icon: 'home', name: 'homepage' },
        			{ title: 'Evaluation', component: EvaluationPage, icon: 'pie', name: 'evaluationpage' },
        			{ title: 'Apply Now', component: LoanapplicationPage, icon: 'medal', name: 'loanapplicationpage' },
        			{ title: 'Loans', component: LoansPage, icon: 'medal', name: 'loanspage' },
        			{ title: 'Payments', component: HomePage, icon: 'cash', name: 'paymentspage' }
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
	  if(page.name == 'paymentspage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else if(page.name == 'supportpage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else if(page.name == 'aboutuspage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else{
		  this.nav.setRoot(page.component);
	  }
	   
	  this.menu.close();
  };
  
  logout() {
	    this.showLoader();
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
  
showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
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

