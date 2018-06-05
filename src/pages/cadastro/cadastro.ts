import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { LoadingController,AlertController } from 'ionic-angular';

@Component({
selector: 'page-cadastro',
templateUrl: 'cadastro.html'
})
export class CadastroPage {
	loader:any;
	maskData:any = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
	maskCel:any = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' - ', /\d/, /\d/, /\d/, /\d/];
	maskCpf:any = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	maskCep:any = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
	form:FormGroup = new FormGroup({
		nome : new FormControl('', [
			Validators.required
			]),
		email : new FormControl('', [
			Validators.required,
			Validators.email
			]),
		datanasc : new FormControl('', [
			Validators.required,
			Validators.minLength(8)
			]),
		celular : new FormControl('', [
			Validators.required,
			Validators.minLength(14)
			]),
		cpf : new FormControl('', [
			Validators.required,
			Validators.minLength(14)
			]),
		cep : new FormControl('', [
			Validators.required,
			Validators.minLength(9)
			]),
		logradouro : new FormControl('', [
			Validators.required
			]),
		numero : new FormControl('', [
			Validators.required
			]),
		complemento : new FormControl('', [
			Validators.required
			]),
		bairro : new FormControl('', [
			Validators.required
			]),
		cidade : new FormControl('', [
			Validators.required
			]),
		estado : new FormControl('', [
			Validators.required
			]),
		senha : new FormControl('', [
			Validators.required,
			Validators.minLength(6)
		]),
		termos : new FormControl('false', [
			Validators.required
		])
	});
	data_facebook:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private cs:CadastroService,public loadingCtrl:LoadingController, public alertCtrl: AlertController) {
		console.log(this.navParams.data);
		this.data_facebook = this.navParams.data;
		this.form.patchValue({senha:this.data_facebook.id,email:this.data_facebook.email});
	}

	ngOnInit() {
		console.log(this.form);1
		let formdata:FormData = new FormData();
		console.log(formdata)
	}

	createLoading () {
		this.loader = this.loadingCtrl.create({
			content: "Carregando"
		});
		this.loader.present();
	}

	showAlert(title:string, text:string) {
		let alert = this.alertCtrl.create({
		  title: title,
		  subTitle: text,
		  buttons: ['OK']
		});
		alert.present();
	}

	finalizar() {
		this.createLoading();
		console.log(this.form.value);
		if (this.form.valid) {
			this.cs.cadastro(this.form.value)
			.subscribe( ( data:any ) => {
				this.loader.dismissAll();
				this.showAlert('Sucesso!', 'Sua conta foi criada com sucesso!');
			})
		}
	}
}
