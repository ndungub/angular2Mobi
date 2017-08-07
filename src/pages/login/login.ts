import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, Nav, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { Tile } from './models/tile.model';

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
    authData = {};
    public tiles: Tile[][];
    submitted = false;
    
    
    
    constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
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
	    this.authData = {loginData: this.loginData};
	   
	    this.showLoader();
	    this.authService.login(this.authData).then((result) => {
	      this.loading.dismiss();
	      this.data = result;
	      localStorage.setItem('token', this.data.access_token);
	      this.navCtrl.setRoot(TabsPage);
	    }, (err) => {
	      this.loading.dismiss();
	      this.presentToast(err);
	    });
	  }
	};
	  
    register() {
    	this.nav.setRoot(RegisterPage);
	    //this.navCtrl.push(RegisterPage);
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

}
