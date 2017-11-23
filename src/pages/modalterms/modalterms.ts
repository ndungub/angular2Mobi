import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { RegisterPage } from '../register/register';

//Events
import { Events } from 'ionic-angular';

/**
 * Generated class for the ModaltermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalterms',
  templateUrl: 'modalterms.html',
})
export class ModaltermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController, public events: Events) {
	  
  }

  public acceptTerms(){
	  this.events.publish('termsandconditions',true);
	  this.viewCtrl.dismiss();
  }
  
  public rejectTerms(){
	  this.events.publish('termsandconditions',false);
	  this.viewCtrl.dismiss();
  }

}
