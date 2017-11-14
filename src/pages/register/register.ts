import { Injectable, Component,ViewChild } from '@angular/core';
import { NavController, Nav, Slides, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel';

import { Camera } from '@ionic-native/camera';
//import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [[Camera]]
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
	options:any;

	//response =  new RequestModel();
	
	ngOnInit() {
	    this.slides.lockSwipes(true); // Lock the slides
	    let currentIndex = this.slides.getActiveIndex();
	  };
	  
	  
	  
	
    constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider,  public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController,private camera: Camera,private actionSheetCtrl: ActionSheetController, private file: File) {
    	this.today = new Date().toISOString();
    	this.dob = new Date().toISOString();
    	
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
  
  ValidateSignUpBIO(){
	  this.slides.lockSwipes(false);
	  this.slides.slideNext();
	  this.slides.lockSwipes(true);
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
	                	    this.MakeFileUpload(this.photoDataURI);
	                	    
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
  
 

 MakeFileUpload(imageData)  { 
	  'use strict';
	  this.showLoader('Uploading photo.....');
	  
	  this.loading.present().then(() => {
		  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
			  const byteCharacters = atob(b64Data);
			  const byteArrays = [];
			  
			  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			    const slice = byteCharacters.slice(offset, offset + sliceSize);
			    
			    const byteNumbers = new Array(slice.length);
			    for (let i = 0; i < slice.length; i++) {
			      byteNumbers[i] = slice.charCodeAt(i);
			    }
			    
			    const byteArray = new Uint8Array(byteNumbers);
			    
			    byteArrays.push(byteArray);
			  }
			  
			  const blob = new Blob(byteArrays, {type: contentType});
			  return blob;
			};
			
			const contentType = 'image/png';
			const blob = b64toBlob(imageData, contentType);
			
			let _self = this;
			let registerOperation:Observable<RequestModel>;
	    	registerOperation = _self.authService.makeFileUpload(blob,'72','mobilephotoimage');
	    	registerOperation.subscribe(
	    			response => {
	    				this.loading.dismiss();
	    				_self.slides.lockSwipes(false);
	    				_self.slides.slideNext();
	    				_self.slides.lockSwipes(true);
	            	    
	    				_self.showAlert(response.retmsg,"Vuqa");
	                }, 
	                err => {
	                	this.loading.dismiss();
	                	_self.slides.lockSwipes(false);
	    				_self.slides.slideNext();
	    				_self.slides.lockSwipes(true);
	    				
	                	_self.showAlert(err,"Vuqa");
	       });
	  });
  }; 
 
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
  
  takePhoto(){
	  this.showLoader('Loading.....');
	  this.loading.present().then(() => {
		  this.options = {
			        quality: 100,
			        sourceType: this.camera.PictureSourceType.CAMERA,
			        saveToPhotoAlbum: true,
			        correctOrientation: true,
			        destinationType: this.camera.DestinationType.DATA_URL,
			        mediaType: this.camera.MediaType.PICTURE
			      }
				  this.camera.getPicture(this.options).then((imageData) => {
					  this.loading.dismiss();
					  this.photoImage = 'data:image/jpeg;base64,' + imageData;
					  this.photoDataURI = imageData;
				    }, (err) => {
				    	this.loading.dismiss();
				    	this.showAlert(err,"Vuqa");
			      });
	  });
  };
  
  browsePhoto(){
	  this.showLoader('Loading.....');
	  this.loading.present().then(() => {
	  this.options = {
		        quality: 100,
		        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		        saveToPhotoAlbum: true,
		        correctOrientation: true,
		        destinationType: this.camera.DestinationType.DATA_URL,
		        mediaType: this.camera.MediaType.PICTURE
		      }
			  this.camera.getPicture(this.options).then((imageData) => {
				  this.loading.dismiss();
				  this.photoImage = 'data:image/jpeg;base64,' + imageData;
				  this.photoDataURI = imageData;
			    }, (err) => {
			    	this.loading.dismiss();
			    	this.showAlert(err,"Vuqa");
		      });
	  });
  };

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
	    	return this.ValidateSignUpBIO();
	    }else if(currentIndex == 2){
	    	return this.SubmitSignUpBIO();
	    	
	    }else if(currentIndex == 3){
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
	    if(currentIndex == 3){
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
	
 uploadActionSheet() {
	   let actionSheet = this.actionSheetCtrl.create({
	     title: 'Modify your album',
	     buttons: [
	       {
	         text: 'Take Photo',
	         handler: () => {
	        	 this.takePhoto();
	         }
	       },
	       {
	         text: 'Browse Photo',
	         handler: () => {
	           this.browsePhoto();
	         }
	       }
	     ]
	   });

	   actionSheet.present();
 };
}
