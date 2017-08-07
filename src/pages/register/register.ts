import { Component,ViewChild } from '@angular/core';
import { NavController, Nav, Slides, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	
	@ViewChild(Slides) slides: Slides;
	public firstSlider = true;
	public registerOTPSent = false;
	
	loading: any;
	regData = { username:'', password:'' };
	
	ngOnInit() {
	    this.slides.lockSwipes(true); // Lock the slides
	    let currentIndex = this.slides.getActiveIndex();
	    
	    if (currentIndex == 0) {
			console.log("");
		}
	  };
	  
	  today
	  
	
    constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider,  public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    	this.today = new Date().toISOString();
    	
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  };
  
  doSignup() {
	    this.showLoader();
	    this.authService.register(this.regData).then((result) => {
	      this.loading.dismiss();
	      this.navCtrl.pop();
	    }, (err) => {
	      this.loading.dismiss();
	      this.presentToast(err);
	    });
  };
  
  public registerBack() {
		this.nav.setRoot(LoginPage);
		//this.navCtrl.push(tile.component);
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
  
  nextSlide(){
  	    let currentIndex = this.slides.getActiveIndex();
	    if(currentIndex == 2){
	    	 this.nav.setRoot(HomePage);
	    }
	    
	    this.slides.lockSwipes(false);
	    this.slides.slideNext();
	    this.slides.lockSwipes(true);
	    


  };
  
  backSlide(){
	  
	    this.slides.lockSwipes(false);
	    this.slides.slidePrev();
	    this.slides.lockSwipes(true);
	    
	    let previousIndex = this.slides.getPreviousIndex();
	    if(previousIndex == 1){
	    	this.firstSlider = true;
	    }
  };
  
  slideChanged() {
	    let currentIndex = this.slides.getActiveIndex();
	    this.firstSlider = false;
	    
	    if (currentIndex == 0) {
	    	this.firstSlider = true;
		}
  };
  
  validateRegisterOTP() {
	  this.registerOTPSent = true;
  };
  

}
