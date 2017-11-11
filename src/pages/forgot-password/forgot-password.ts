import { Component,ViewChild } from '@angular/core';
import { NavController, Nav,Slides, LoadingController,AlertController, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

//Services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel'
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
	@ViewChild(Slides) slides: Slides;
	loading: any;
	forgotpin = {pinno: ''};
	dob;
	
	ngOnInit() {
	    this.slides.lockSwipes(true); // Lock the slides
	    let currentIndex = this.slides.getActiveIndex();
	  };
	  
	constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider,  public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    	this.dob = new Date().toISOString();
    	
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  
  	sendForgotPinOTP() {
		    this.showLoader();
		    let registerOperation:Observable<RequestModel>;
		    
		    let data = {data: this.forgotpin};
		    this.loading.present().then(() => {
		    	registerOperation = this.authService.sendForgotPinOTP(data);
		    	registerOperation.subscribe(
		    			response => {
		                	this.loading.dismiss();
		                	if(response.retcode == "000"){
		                		this.slides.lockSwipes(false);
		                	    this.slides.slideNext();
		                	    this.slides.lockSwipes(true);
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
	
	
	validateResetPIN() {
	    this.showLoader();
	    let registerOperation:Observable<RequestModel>;
	    
	    let data = {data: this.forgotpin};
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.validateSendForgotPinOTP(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.slides.lockSwipes(false);
	                	    this.slides.slideNext();
	                	    this.slides.lockSwipes(true);
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
	
	
	resetPIN() {
	    this.showLoader();
	    let registerOperation:Observable<RequestModel>;
	    
	    let hashed:any;
    	hashed = this.authService.encryptSalt(this.forgotpin.pinno);
    	this.forgotpin['encrypted'] = hashed.encrypted;
    	this.forgotpin['iv'] = hashed.iv;
    	this.forgotpin['key'] = hashed.key;
    	
	    let data = {data: this.forgotpin};
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.resetForgotPIN(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	
	                	if(response.retcode == "000"){
	                		
	                		this.shareService.setLoginSessionMobileNo(response.results.mobileno);
	                		this.shareService.setFullNames(response.results.name);
	                		this.shareService.setIdno(response.results.idno);
	                		this.shareService.setIdTypeDesc(response.results.idtypedesc);
	                		this.shareService.setMedal(response.results.medal);
	                		this.shareService.setEligibleAmount(response.results.eligibleamount);
	                		
	                		this.showAlert(response.retmsg,"Vuqa");
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

  closeForgotPIN(){
	  this.nav.setRoot(LoginPage);
  }

 showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
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
