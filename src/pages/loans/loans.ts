import { Component } from '@angular/core';
import { App, NavController, NavParams,Nav,AlertController ,LoadingController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

//Services
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { LoanServiceProvider } from '../../providers/loan-service/loan-service';

import {Observable} from 'rxjs/Rx';
import { LoanApplicationModel } from '../../model/loanApplicationModel';
/**
 * Generated class for the LoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loans',
  templateUrl: 'loans.html',
})
export class LoansPage {

	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams, public loanService: LoanServiceProvider, public shareService: ShareServiceProvider, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private toastCtrl: ToastController) {
	};

  
  public loansBack() {
		this.nav.setRoot(HomePage);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoansPage');
  }

}
