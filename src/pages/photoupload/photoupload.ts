import { Component } from '@angular/core';
import { NavController, Nav, Slides, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import {Observable} from 'rxjs/Rx';
import { RequestModel } from '../../model/requestModel';

import { Camera } from '@ionic-native/camera';
import {File} from '@ionic-native/file';

/**
 * Generated class for the PhotouploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-photoupload',
  templateUrl: 'photoupload.html',
  providers: [[Camera]]
})
export class PhotouploadPage {
	loading: any;
	photoImage: any;
	options:any;

  constructor(public navCtrl: NavController, public nav: Nav, public authService: AuthServiceProvider,  public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, private actionSheetCtrl: ActionSheetController, private camera: Camera, private file: File) {
  	
  	
  }

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
					  //this.photoDataURI = imageData;
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
				  //this.photoDataURI = imageData;
			    }, (err) => {
			    	this.loading.dismiss();
			    	this.showAlert(err,"Vuqa");
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
			let customerID ='';
	    	registerOperation = _self.authService.makeFileUpload(blob,customerID,'mobilephotoimage');
	    	registerOperation.subscribe(
	    			response => {
	    				this.loading.dismiss();
	    				this.showAlert(response.retmsg,"Vuqa");
	                }, 
	                err => {
	                	this.loading.dismiss();
	                	this.showAlert(err,"Vuqa");
	       });
	  });
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

closePhotoUpload(){
	this.nav.setRoot(HomePage); 
}
showAlert(msg,title) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: msg,
	    buttons: ['Dismiss']
	  });
	  alert.present();
	};
	
showLoader(msg){
    this.loading = this.loadingCtrl.create({
        content: msg
    });

    this.loading.present();
};


}
