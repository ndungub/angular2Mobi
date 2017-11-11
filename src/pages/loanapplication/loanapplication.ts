import { Component, ChangeDetectorRef } from '@angular/core';
import { App, NavController, NavParams,Nav ,LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Amounts} from './interface/interface';

/**
 * Generated class for the LoanapplicationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loanapplication',
  templateUrl: 'loanapplication.html',
})
export class LoanapplicationPage {
	selectedValue: number;
	loanamounts: Amounts[] = [];
	loanperiods: Periods[] = [];
	loanapplicationData = { loanamount:'', loanperiod:'' };


	    
	constructor(public app: App, public navCtrl: NavController, public nav: Nav, public navParams: NavParams,public loadingCtrl: LoadingController, private toastCtrl: ToastController,private ref: ChangeDetectorRef) {
		this.loadLoanAmount();
	};


	private loadLoanAmount() {
		  let obj = <Amounts>{}
		  var ceilAmount = 2300;
		  var NumOfLoops = Math.floor(ceilAmount / 500);
		  
		  for(let i= 1; i<=NumOfLoops; i++) {
			var loanDenomanation = i * 500;
		    this.loanamounts.push({loanamountIndex: i, loanamount: loanDenomanation});
		  }
		  
		  for(let i= 0; i<=3; i++) {
			    this.loanperiods.push({periodIndex: i, periodNum: i+1});
		  }
	    };
	    
  public loanapplicationBack() {
		this.nav.setRoot(HomePage);
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanapplicationPage');
  }

}
export interface Periods {
	periodIndex: number;  
    periodNum : number;
}

