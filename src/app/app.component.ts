import { Component } from '@angular/core';
import { Platform,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';


import { ModalPage } from '../pages/modal/modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(public modalCtrl: ModalController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    let modal = this.modalCtrl.create(ModalPage);
    localStorage.saldo = '00,00';
    modal.onDidDismiss(data => { 
      if( !localStorage.nome ) { 
      this.rootPage = ListPage;
    }else {
      this.rootPage = GamePage;
    }
    });
    modal.present();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
