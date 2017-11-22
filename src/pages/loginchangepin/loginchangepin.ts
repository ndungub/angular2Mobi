import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, Nav, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


//Services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel';

import { Events } from 'ionic-angular';

/**
 * Generated class for the LoginchamgepinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loginchangepin',
  templateUrl: 'loginchangepin.html',
})
export class LoginchangepinPage {
	loading: any;
	changepin = {};
	submitted = false;
	
	constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public events: Events) {

    }
	
	 
	doChangePIN(form: NgForm) {
		    this.submitted = true;

		    if (form.valid) {
		    	this.showLoader();
			    let validateOperation:Observable<RequestModel>;
			    //authData = {};
			    this.changepin['mobileno'] = this.shareService.getLoginSessionMobileNo();
			    
			    let authData = {data: this.changepin};
			    this.loading.present().then(() => {
			    	
			    	validateOperation = this.authService.firstTimeChangePIN(authData);
			    	validateOperation.subscribe(
			    			response => {
			                	this.loading.dismiss();
			                	if(response.retcode == "000"){
			                		if(response.results.requirepinchange == 0){
			                			localStorage.setItem('devicechanged','false');
			                			
				                		this.shareService.setFullNames(response.results.name);
				                		this.shareService.setIdno(response.results.idno);
				                		this.shareService.setIdTypeDesc(response.results.idtypedesc);
				                		this.shareService.setMedal(response.results.medal);
				                		this.shareService.setEligibleAmount(response.results.eligibleamount);
				                		this.shareService.setLoanLimit(response.results.loanlimit);
				                		
				                		
				                		this.nav.setRoot(HomePage);
			                		}else{
			                			this.showAlert(response.retmsg,"Vuqa");
			                		}
			                		
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
