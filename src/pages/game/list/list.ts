import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ListPage } from '../../list/list';

import { PlayerPage } from '../player/player';

import { ListService } from './list.service';

@Component({
selector: 'page-list-game',
templateUrl: './list.html'
})
export class ListGamePage {

	list:Array<any>;
	playerPage = PlayerPage;
	localStorage = localStorage;

	constructor(public alertCtrl:AlertController,public navCtrl: NavController, public lService:ListService, public loadingCtrl:LoadingController) {
		let loader = this.loadingCtrl.create({
	      content: "Carregando"
	    });
	    loader.present();

		lService.getList()
		.subscribe((data:any) => {
			console.log(loader);
			loader.dismissAll()
			this.list = data.ativos;
		});
	}
	logged() {
  	return localStorage.nome;
  }
	openRegra(text) {
		this.alertCtrl.create({title:'Regras.', subTitle:text,
				buttons: ['Ok, Entendi!']
			})
			.present();
	}
	openGame(id:number) {
		if(localStorage.userID) {
			this.navCtrl.push(PlayerPage, {id:id});
		}else {
			alert("Você precisa realizar o login antes.");
			this.navCtrl.setRoot(ListPage);
		}

	}
	regra () {
		alert("Este é um jogo teste.");
	}
}

