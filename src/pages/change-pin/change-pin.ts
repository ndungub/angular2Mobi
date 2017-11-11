import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, Nav, LoadingController,AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel'

/**
 * Generated class for the ChangePinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
	loading: any;
	submitted = false;
	changepin = {  pinno:'' , confirmpin:''};
	constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider,  public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
    	
    };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePinPage');
  }

  
  showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: 'Authenticating...'
	    });

	    this.loading.present();
	  };

	doChangePassword(form: NgForm) {
	    this.submitted = true;

	    if (form.valid) {
	    	this.showLoader();
		    let changePinOperation:Observable<RequestModel>;
		    
		    
		    let hashed:any;
	    	hashed = this.authService.encryptSalt(this.changepin.pinno);
	    	let newData = {};
	    	
	    	newData['encrypted'] = hashed.encrypted;
	    	newData['iv'] = hashed.iv;
	    	newData['key'] = hashed.key;
	    	newData['mobileno'] = this.shareService.getLoginSessionMobileNo();
	    	
	    	
		    let data = {data: newData};
		    this.loading.present().then(() => {
		    	
		    	changePinOperation = this.authService.changePIN(data);
		    	changePinOperation.subscribe(
		    			response => {
		                	this.loading.dismiss();
		                	if(response.retcode == "000"){
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
		  }
		}; 
   closeChangePIN(){
	   this.nav.setRoot(HomePage);
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
