import { Component } from '@angular/core';
import { App, NavController, NavParams,Nav ,LoadingController, ToastController } from 'ionic-angular';


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
	evaluation_tab= '';
	statusrating = '';

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
	  this.navCtrl = navCtrl;
	  this.evaluation_tab = 'segmentbronze';
	  this.statusrating = 'Silver (KES 20,000)';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluationPage');
  }


  
}
