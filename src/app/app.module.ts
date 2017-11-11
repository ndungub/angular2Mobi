import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule} from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../providers/share-service/share-service';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ValidateLoginPage } from '../pages/validate-login/validate-login';
import { RegisterPage } from '../pages/register/register';
import { EvaluationPage } from '../pages/evaluation/evaluation';
import { LoanapplicationPage } from '../pages/loanapplication/loanapplication';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChangePinPage } from '../pages/change-pin/change-pin';
import {File} from '@ionic-native/file';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ForgotPasswordPage,
    ValidateLoginPage,
    RegisterPage,
    HomePage,
    EvaluationPage,
    LoanapplicationPage,
    AboutPage,
    ContactPage,
    ChangePinPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ForgotPasswordPage,
    ValidateLoginPage,
    RegisterPage,
    HomePage,
    EvaluationPage,
    LoanapplicationPage,
    AboutPage,
    ContactPage,
    ChangePinPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ShareServiceProvider
  ]
})
export class AppModule {}
