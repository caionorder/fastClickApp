import { Component } from '@angular/core';
import { AlertController,LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagamentoService } from './pagamento.service';

@Component({
    selector: 'pagamento',
    templateUrl: 'pagamento.html'
})

export class PagamentoPage {


    loader:any;

    form:FormGroup = new FormGroup({
        endereco : new FormControl('', [Validators.required]),
        numero : new FormControl('', [Validators.required]),
        complemento : new FormControl('', [Validators.required]),
        bairro : new FormControl('', [Validators.required]),
        cidade : new FormControl('', [Validators.required]),
        estado : new FormControl('', [Validators.required]),
        cep : new FormControl('', [Validators.required, Validators.minLength(9)]),
        celular : new FormControl('', [Validators.required, Validators.minLength(14)]),
        nCartao : new FormControl('', [Validators.required, Validators.minLength(19)]),
        nomeCartao : new FormControl('', [Validators.required]),
        dataVenc : new FormControl('', [Validators.required, Validators.minLength(5)]),
        codigo : new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    constructor(public pag:PagamentoService,public loadingCtrl:LoadingController,public alertCtrl:AlertController) { }

    ngOnInit() { console.log(this.form) }

    createAlert(texto) {
        let alert = this.alertCtrl.create({
            title: texto,
            buttons: ['Ok.']
        });
        alert.present();
    }

    finalizar() {
        if(this.form.valid) {
             // this.createAlert("Preencha os campos corretamente.");
        }
        this.pag.getTimer(this.form.value)
        .subscribe(() => {
            if(this.form.value.nCartao!="4111 1111 1111 1111") {
                this.createAlert("Pagamento não realizado, verifique as informações.");
                return;
            }
                this.createAlert("Pagamento realizado, aguarde a confirmação do pagamento no seu e-mail.");
        })

        // this.pag.setToken();
        // this.pag.getSenderHash();

        // this.pag.getCardToken(this.form.value)
        // .then( (data:any) => { console.log(data); } )
        // console.log(this.form);
    }

}