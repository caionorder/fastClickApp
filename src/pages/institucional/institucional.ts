import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
@Component({
    selector: 'institucional',
    templateUrl: 'institucional.html'
})

export class InstitucionalPage {
    loader:any;
    data:any;
    url:any = "http://fastclickapp.com.br/admin/api/info";
	constructor(public http:Http,public navParams: NavParams,public loadingCtrl:LoadingController) {
		this.loader = this.loadingCtrl.create({
	      content: "Carregando"
	    });
	    this.loader.present();
		this.getInstitucional(this.navParams.get('id'))
		.subscribe((data) => {
	        this.loader.dismissAll();
				this.data=data;
			})
	}
	getInstitucional (id:number) {
		return this.http.post(this.url,{id:id})
		.map(data => data.json().Contact);

	}

}