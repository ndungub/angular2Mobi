import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root: any = HomePage;
	tab2Root: any = AboutPage;
	tab3Root: any = ContactPage;
	
	constructor(public navCtrl: NavController) {
	  if(!localStorage.getItem("token")) {
	    navCtrl.setRoot(LoginPage);
	  }
	}

}
