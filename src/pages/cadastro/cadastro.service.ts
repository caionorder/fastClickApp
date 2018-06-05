import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CadastroService {

    constructor(private http:Http) { }

    cadastro(data){
        return this.http.post('http://fastclickapp.com.br/admin/api/players/add', data)
        .map(data => data.json());
    }
    
}