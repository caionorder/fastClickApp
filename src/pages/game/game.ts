import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlanosPage } from '../planos/planos';
import { InstitucionalPage } from '../institucional/institucional';
import { ListGamePage } from './list/list';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {


	listGame = ListGamePage;
	institucionalPage = InstitucionalPage;
  	planos:any = PlanosPage;
  	localStorage = localStorage;
  
  constructor(public navCtrl: NavController) {

  }
  logged() {
  	return localStorage.nome;
  }
  reOpenVideo() {
  	localStorage.removeItem('openVideo');
  	location.reload();
  }
  substr() {
  	if(localStorage.nome) {
  		return localStorage.nome.substr(0, 1);

  	}
  }
  openLink (link:string) {
    console.log('Clicou')
  	// this.InAppBrowser.open(link, '_system', 'location=yes');
  }

}
