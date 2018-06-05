import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

declare var PagSeguroDirectPayment;
@Injectable()
export class PagamentoService {
	


	constructor() {}

	setToken () {
		PagSeguroDirectPayment.setSessionId('917934b43927455ca777517e0f3c4050');
	}

	getSenderHash () {
		return PagSeguroDirectPayment.getSenderHash();
	}

	getTimer (dados) {
		return timer(1000);
	}
	getCardToken(dados:any) {
		return new Promise ((done) => {
			console.log(dados.dataVenc.split('/')[0]);
			var param = {
			    cardNumber: dados.nCartao,
			    cvv: dados.codigo,
			    expirationMonth: dados.dataVenc.split('/')[0],
			    expirationYear: "20"+dados.dataVenc.split('/')[1],
			    success: function(response) {
			    	console.log(response);
			        done(response)
			    },
			    error: function(response) {
			    	console.log(response);
			        done(response)
			    },
			    complete: function(response) {
			    	console.log(response);

			        //tratamento comum para todas chamadas
			    }
			}

			PagSeguroDirectPayment.createCardToken(param);
		})
		
	}

}