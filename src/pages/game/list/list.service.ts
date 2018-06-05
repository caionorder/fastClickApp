import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ListService {
	
	url:any = 'http://fastclickapp.com.br/admin/api/games';
	constructor( public http:Http ) {}

	getList () {
		return this.http
		.get(this.url)
		.map(data => data.json())
		
	}
}
