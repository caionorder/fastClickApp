import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginService } from '../login/login.service';
import { CadastroPage } from '../cadastro/cadastro';
import { Facebook } from '@ionic-native/facebook';
import { GamePage } from '../game/game';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {

	login:any = LoginPage;
	cadastro:any = CadastroPage;
	game:any = GamePage;
	permissions:Array<string> = ["public_profile", "email"];
	constructor(public navCtrl: NavController, public navParams: NavParams, public fb: Facebook, public lg: LoginService) {

	}

	loginFacebook () {
		this.fb.login(this.permissions).then((response) => {
			this.fb.api("/me?fields=picture,name,email", [])
			.then(res => {
				this.lg.login({email:res.email,senha:res.id})
				.subscribe((log) => {
					if ( log.status ) {

						localStorage.setItem('authResponse', null);
						localStorage.setItem('userID', log.info.id);
						localStorage.setItem('nome', log.info.nome);
						localStorage.setItem('email', log.info.email);
						localStorage.setItem('saldo', log.info.saldo);
						this.navCtrl.push(GamePage);


					}
					if(log.status==false) {
						this.navCtrl.push(CadastroPage,res);
						return;
					}
				})
			}, (error) => {
				console.log('ERRO LOGIN: ',error);
			})
		});
	}

}
