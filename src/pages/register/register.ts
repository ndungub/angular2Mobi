import { Injectable, Component,ViewChild } from '@angular/core';
import { NavController, Nav, Slides, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ModaltermsPage } from '../modalterms/modalterms';

//Services
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel';

//Event
import { Events } from 'ionic-angular';

//import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';


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
@Injectable()
export class RegisterPage {
	

	@ViewChild(Slides) slides: Slides;
	public firstSlider = true;
	public lastSlider = false;
	public registerOTPSent = false;
	public photoImage: string;
	public photoDataURI: string;

	
	loading: any;
	regData = {mobileno: ''};
	today;
	dob;
	termsandconidtion: boolean = false;
	

	//response =  new RequestModel();
	

	  
    constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider,  public loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, public events: Events, public modalCtrl : ModalController) {
    	this.today = new Date().toISOString();
    	this.dob = new Date().toISOString();
    	
    	
    	events.subscribe('termsandconditions', (data) => {
    		this.termsandconidtion = data;
        });
    	
    	
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  };


  SendSignUpOTP() {
	    this.showLoader('Sending OTP.....');
	    let registerOperation:Observable<RequestModel>;
	    
	    let data = {};
	    data['data'] = this.regData;
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.sendRegisterOTP(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	if(response.retcode == "000"){
	                		this.registerOTPSent = true;
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

  ValidateSignUpOTP()  {
	  this.showLoader('Validating OTP......');
	    let registerOperation:Observable<RequestModel>;
	    
	    let data = {};
	    data['data'] = this.regData;
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.validateRegisterOTP(data);
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
  
  
  SubmitSignUpBIO()  {
	  this.showLoader('Submitting.....');
	    let registerOperation:Observable<RequestModel>;
	    
	    let data = {};
	    data['data'] = this.regData;
	    this.loading.present().then(() => {
	    	registerOperation = this.authService.validateRegisterBIO(data);
	    	registerOperation.subscribe(
	    			response => {
	                	this.loading.dismiss();
	                	
	                	if(response.retcode == "000"){
	                		//localStorage.setItem('registered', true);
	                		this.slides.lockSwipes(false);
	                	    this.slides.slideNext();
	                	    this.slides.lockSwipes(true);
	                	    
	                	}
	                	this.showAlert(response.retmsg,"Vuqa");

	                }, 
	                err => {
	                    // Log errors if any
	                	this.showAlert(err,"Vuqa");
	                    this.loading.dismiss();
	        });
	    });
  };
  
  isChecked (): void{
	  if(this.termsandconidtion){
		  let termsModal = this.modalCtrl.create(ModaltermsPage);
		  termsModal.present(); 
	  }
  }
 
/* MakeFileUpload(imageData)  {
	  let _self = this;
	  this.file.resolveLocalFilesystemUrl(imageData).then((fileEntry: any) => {
		  fileEntry.file(function(file) {
			  let reader = new FileReader();
			  reader.onloadend = function(encodedFile: any) {
				  //let src = encodedFile.target.result;

				  let imgBlob = new Blob([ encodedFile.target.result ], { type: "image/png" } );
				  
				  let registerOperation:Observable<RequestModel>;
			    	registerOperation = _self.authService.makeFileUpload(imgBlob,'72','mobilephotoimage');
			    	registerOperation.subscribe(
			    			response => {
			    				_self.showAlert("Photo Uploaded Successfully","Vuqa");
			                }, 
			                err => {
			                    // Log errors if any
			                	_self.showAlert(err,"Vuqa");
			       });
			  }; 
			  reader.readAsArrayBuffer(file);
          }, function(err) {
        	  this.showAlert(err,"Vuqa");
          });  
		    
	  }, (err) => {
		  _self.showAlert(err,"Vuqa");
	  });  

		

  };*/ 
  

  public registerBack() {
		this.nav.setRoot(LoginPage);
		//this.navCtrl.push(tile.component);
	};

  showLoader(msg){
	    this.loading = this.loadingCtrl.create({
	        content: msg
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
  	    let slidenext = false;
  	    
	    if(currentIndex == 0){
	    	return this.ValidateSignUpOTP();	
	    }else if(currentIndex == 1){
	    	return this.SubmitSignUpBIO();
	    }else if (currentIndex == 2) {
	    	this.nav.setRoot(LoginPage);
        }
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
	    if(currentIndex == 2){
	    	this.lastSlider = true;
	    }
  };
  
  /*validateRegisterOTP() {
	  this.registerOTPSent = true;
  };*/
  
  showAlert(msg,title) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: msg,
	    buttons: ['Dismiss']
	  });
	  alert.present();
	};
	

}
