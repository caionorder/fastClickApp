import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { PlayerService } from './player.service';
import { PlanosPage } from './../../planos/planos';
import { RankingPage } from './../../ranking/ranking';
import { AlertController } from 'ionic-angular';
import moment from 'moment';

@Component({
	selector: 'page-player',
	templateUrl: './player.html'
})
export class PlayerPage {

	game:any;
	resultGame:any;
	time_start:number;
	clicks:number=0;
	timer:any;
	join:boolean=false;
	time_percent:number = 0;
	time_game:number = 0;
	loader:any;
	int:any;
	intS:any;
	timer$:any;

	constructor(public navCtrl:NavController,public navParams: NavParams, public alertCtrl:AlertController,  public loadingCtrl:LoadingController, public ps:PlayerService) {
		
		this.start();
	}
	start () {
		if(localStorage[this.navParams.get('id')]=='true'){
			this.join = true;
		}
		this.createLoading();
		this.ps
		.getGame(this.navParams.get('id'))
		.subscribe((game:any) => {
			this.loader.dismissAll();
			this.game =game.Game;
			this.getNextStep(this.game.dategame,this.game.timeforgame);
			if(!this.nextStepTime) {
				return;
			}
			let time_start = (this.nextStepTime-this.startTime)*1000; 
			console.log(time_start);

			this.time_start=(time_start-(-1*1000))/1000;
			this.int = interval(1000)
			.subscribe((i) => {
				this.game.statusGame='1';
				if((time_start-(i*1000))/1000>60) {
					return;
				}
				this.game.statusGame='5';
				if(i==time_start/1000) {this.int.unsubscribe();return;}
				this.time_start=(time_start-(i*1000))/1000;
			});
			console.log(interval,timer);

			this.timer$ = timer(time_start)
			.subscribe(() => this.startGame())
		})
	}
	ngOnDestroy() {
		console.log('EXIT');
		if(this.int){return;}
		this.int.unsubscribe();
		this.intS.unsubscribe();
		if(this.timer$){return;}
		this.timer$.unsubscribe();
		
	}
	createLoading () {
		this.loader = this.loadingCtrl.create({
			content: "Carregando"
		});
		this.loader.present();
	}
	openClassfication () {
		this.navCtrl.push(RankingPage, {clicks:null});

	}
	createAlert() {
		this.ngOnDestroy();
		this.navCtrl.push(RankingPage, {clicks:this.clicks});

		this.time_game=0;
		this.time_percent =0;
	}
	joinRoom() {
		if(parseInt(localStorage.saldo.replace(',','.'))<parseInt(this.game.minvalor)) {
			this.alertCtrl
			.create({title:'Saldo insuficiênte.', subTitle:'Seu saldo é insuficiente para participar dessa partida.',buttons: ['Ok, Entendi!',{ text: 'Comprar crédito.',
        role: 'saldo',handler: data => {
          			this.navCtrl.push(PlanosPage);
        }}]})
			.present();
			return;
		}
		this.ps
		.joinRoom({game_id:this.game.id,player_id:localStorage.userID})
		.subscribe(() => {
			localStorage[this.game.id] = 'true';
			this.join = true;
			this.alertCtrl
			.create({title:'Parabéns, você entrou na partida.', subTitle:'Por favor aguarde o jogo começar.',
				buttons: ['Ok, Entendi!']
			})
			.present();
		})
	}
	startGame () {
				// Inicia o Jogo
				this.game.statusGame = "2";

				let time_game = parseInt(this.game.timeforgame.replace(':','').replace(':','')+'0'); 
				this.time_game=(time_game-(-1*1000))/1000;
				this.intS = interval(1000)
				.subscribe((i) => {
					console.log(this.time_game);

					if(i==time_game/1000) {this.intS.unsubscribe();return;}
					this.time_game=(time_game-(i*1000))/1000;
					this.time_percent = i/(time_game/1000)*100;
				});

				timer(time_game)
				.subscribe(() => this.endGame())
			}

			endGame () {


		// Finaliza o Jogo
		this.game.statusGame = "1";
		timer(10000)
		.subscribe((data) => {
			this.loader.dismissAll();
			this.createAlert();
			this.ngOnDestroy();

			this.start();
		})
		this.createLoading();
	}
	parseInt:any=parseInt;
	nextStepTime:number;
	nextStepTimeText:string;
	startTime:number;
	etapa:number;
	getNextStep (data_start,time_etapa) {

		moment.locale('pt-br');
		console.log(data_start);
		let time_start = moment(data_start);
		this.startTime = -time_start.diff(moment())/1000;
		let p=0;
		let etapa=1;
		if(this.startTime>0){
			while(this.startTime>p && etapa<=parseInt(this.game.etapas)) {
				this.nextStepTime=p+(60*60)+60;
				p=p+60;
				p=p+(60*60);


				this.nextStepTimeText=moment(data_start).add(this.nextStepTime,'s').fromNow();

				// Considera next Etapa
				etapa++;	
			}
		}
		this.etapa = etapa;
		console.log(etapa);
	}
}

