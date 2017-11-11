import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, Nav, LoadingController,AlertController, ToastController } from 'ionic-angular';

//Services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { ValidateLoginPage } from '../validate-login/validate-login';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { Tile } from './models/tile.model';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loading: any;
    loginData = { mobileno:'', pinno:'' };
    data: any;
    public tiles: Tile[][];
    submitted = false;
   
    
    
    constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider, public shareService: ShareServiceProvider,  public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
    	this.initTiles();
    };
   
   ionViewDidLoad() {
	    console.log('ionViewDidLoad HomePage');
   };
   
   	private initTiles(): void {
		this.tiles = [[{
			title: 'Register',
			path: 'register',
			icon: 'add-circle',
			component: RegisterPage
		}, {
			title: 'About Us',
			path: 'About',
			icon: 'information-circle',
			component: RegisterPage
		}]];
	};
	
	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
		//this.navCtrl.push(tile.component);
	};
	

   
   doLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
    	this.showLoader();
	    let registerOperation:Observable<RequestModel>;
	    //authData = {};
	    
	    let hashed:any;
    	hashed = this.authService.encryptSalt(this.loginData.pinno);
    	this.loginData['encrypted'] = hashed.encrypted;
    	this.loginData['iv'] = hashed.iv;
    	this.loginData['key'] = hashed.key;
    	
	    let authData = {data: this.loginData};
	    this.loading.present().then(() => {
	    	
	    	registerOperation = this.authService.sendLoginOPT(authData);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.nav.setRoot(ValidateLoginPage);
	                		
	                		this.shareService.setLoginSessionMobileNo(this.loginData.mobileno);
	                		
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
	
	forgotPassword(){
		
	};
    register() {
    	this.nav.setRoot(RegisterPage);
	    //this.navCtrl.push(RegisterPage);
    };
    socialLogin() {
    	this.showAlert('Coming Soon...','Vuqa');
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
