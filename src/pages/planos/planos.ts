import { Component } from '@angular/core';
import { PagamentoPage } from '../pagamento/pagamento';
@Component({
    selector: 'planos',
    templateUrl: 'planos.html'
})

export class PlanosPage {
	ppage:any =PagamentoPage;

    loader:any;
    constructor() { }

}