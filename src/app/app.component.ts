import { Component, ViewChild } from '@angular/core';
import {  MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  navigatePages
  otherPages
  accountPages
  rootPage:any = LoginPage;
  private menu: MenuController;

  constructor(platform: Platform, menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu = menu;
      this.navigatePages = [
        			{ title: 'Home', component: LoginPage, icon: 'home' },
        			{ title: 'Evaluation', component: LoginPage, icon: 'pie' },
        			{ title: 'Loans', component: LoginPage, icon: 'medal' },
        			{ title: 'Payments', component: LoginPage, icon: 'cash' }
       ];
      this.otherPages = [
                			{ title: 'Support', component: LoginPage, icon: 'settings' },
                			{ title: 'About Us', component: LoginPage, icon: 'information-circle' }
               ];
      this.accountPages = [
             			{ title: 'Sign Out', component: LoginPage, icon: 'log-out' }
            ];

    });
  }
  
  openPage(page) {
		this.menu.close();
  };
}

