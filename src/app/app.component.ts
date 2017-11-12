import { Component, ViewChild } from '@angular/core';
import {  App, MenuController, Nav, Platform, AlertController,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LoanapplicationPage } from '../pages/loanapplication/loanapplication';
import { ChangePinPage } from '../pages/change-pin/change-pin';
import { LoansPage } from '../pages/loans/loans';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../model/requestModel';


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
  private loadingCtrl: LoadingController;
  private alertCtrl: AlertController;
  loading: any;

  constructor(platform: Platform, menu: MenuController, alertCtrl: AlertController, loadingCtrl: LoadingController, authService: AuthServiceProvider, statusBar: StatusBar, splashScreen: SplashScreen) {
   
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
        			{ title: 'Evaluation', component: HomePage, icon: 'pie', name: 'evaluationpage' },
        			{ title: 'Apply Now', component: LoanapplicationPage, icon: 'medal', name: 'loanapplicationpage' },
        			{ title: 'Loans', component: LoansPage, icon: 'medal', name: 'loanspage' },
        			{ title: 'Payments', component: HomePage, icon: 'cash', name: 'paymentspage' }
       ];
      this.otherPages = [
                			{ title: 'Support', component: HomePage, icon: 'settings', name: 'supportpage' },
                			{ title: 'About Us', component: HomePage, icon: 'information-circle', name: 'aboutuspage' }
               ];
      this.accountPages = [
             			{ title: 'Change PIN', component: ChangePinPage, icon: 'log-out', name: 'changepinpage' },
             			{ title: 'Sign Out', component: HomePage, icon: 'log-out', name: 'signoutpage' }
            ];

    });
  }
  
  openPage(page) {
	  if(page.name == 'evaluationpage'){
		  this.showAlert('Coming soon......','Vuqa');
	  }else if(page.name == 'paymentspage'){
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

