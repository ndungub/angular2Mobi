import { Component } from '@angular/core';
import { App, NavController, NavParams, Nav, LoadingController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';



/**
 * Generated class for the EvaluationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {
	evaluationTab: string;
	statusRating: string;

  constructor(public app: App, public navCtrl: NavController,  public nav: Nav,  public navParams: NavParams, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
	  this.navCtrl = navCtrl;
	  this.evaluationTab = "segment"  + this.shareService.getMedal().toLowerCase();
	  this.statusRating = this.shareService.getMedal() + " (KES " + this.toNum(this.shareService.getLoanLimit()) + ")";
	
  }




  toNum (num): number{
	  num  = Math.round(num);
	  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  
  public evaluationBack() {
		this.nav.setRoot(HomePage);
  };
}
