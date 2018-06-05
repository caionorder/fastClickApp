import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	selector: 'page-ranking',
	templateUrl: 'ranking.html'
})
export class RankingPage {
	clicks:number;
	view:boolean;
	constructor(public navParams: NavParams) {
		this.view = this.navParams.get('view');
		this.clicks = this.navParams.get('clicks');
	}
}
