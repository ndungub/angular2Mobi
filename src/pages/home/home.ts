import { Component } from '@angular/core';
import { App, NavController, Nav, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { EvaluationPage } from '../evaluation/evaluation';
import { LoanapplicationPage } from '../loanapplication/loanapplication';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

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
  
  constructor(public app: App, public navCtrl: NavController,  public nav: Nav, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  logout() {
	    this.authService.logout().then((result) => {
	      this.loading.dismiss();
	      let nav = this.app.getRootNav();
	      nav.setRoot(LoginPage);
	    }, (err) => {
	      this.loading.dismiss();
	      this.presentToast(err);
	    });
	  }

	  showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Authenticating...'
	    });

	    this.loading.present();
	  }

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
		  	this.nav.setRoot(EvaluationPage);
	  }
	  viewLoanApplication() {
		  	this.nav.setRoot(LoanapplicationPage);
	  }
}
