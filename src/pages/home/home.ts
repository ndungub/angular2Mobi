import { Component } from '@angular/core';
import { App, NavController, Nav, LoadingController, ToastController } from 'ionic-angular';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


import { LoginPage } from '../login/login';
import { EvaluationPage } from '../evaluation/evaluation';
import { LoanapplicationPage } from '../loanapplication/loanapplication';
import { LoansPage } from '../loans/loans';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

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
  
  constructor(public app: App, public navCtrl: NavController,  public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public events: Events) {
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
	  //this.qualifiedAmout = 'KES ' + Math.round(this.shareService.getEligibleAmount()).toString();
	  this.qualifiedAmout = this.toNum(this.shareService.getEligibleAmount());
	  this.currentMedal = this.shareService.getMedal();
	  this.medalPath = "assets/images/"  + this.shareService.getMedal().toLowerCase() + ".png";
  };


	
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
  
  toNum (num): number{
	  num  = Math.round(num);
	  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
}
