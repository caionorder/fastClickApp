import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PlayerService {
	
	url:any = "http://fastclickapp.com.br/admin/api/games/game/";
	constructor(public http:Http) {}
	getGame (id:number) {
		return this.http.post(this.url,{id:id})
		.map(data => data.json());

	}
	saveRank (data:{games_id:number,players_id:number,total_clicks:number}) {
		return this.http.post('http://fastclickapp.com.br/admin/api/ranks/add/',data)
		.map(data => data.json());

	}
	joinRoom (data:{game_id:number,player_id:number}) {
		return this.http.post('http://fastclickapp.com.br/admin/api/ranks/add/',data)
		.map(data => data.json());

	}
}