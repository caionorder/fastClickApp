import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AlertController,LoadingController } from 'ionic-angular';
import { GamePage } from '../game/game';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loader:any;
  form:FormGroup = new FormGroup({
    email : new FormControl('', Validators.required),
    senha : new FormControl('', Validators.required)
  });

  constructor(public navCtrl: NavController, public ls:LoginService,public loadingCtrl:LoadingController, public alertCtrl: AlertController) { }

  login() {
    this.createLoading();
    if ( this.form.valid ) {

      this.ls.login(this.form.value)
      .subscribe( ( data:any ) => {
        this.loader.dismissAll();
        if ( data.status ) {
          console.log(data);

          localStorage.setItem('authResponse', null);
          localStorage.setItem('userID', data.info.id);
          localStorage.setItem('nome', data.info.nome);
          localStorage.setItem('email', data.info.email);
          localStorage.setItem('saldo', data.info.saldo);
          this.navCtrl.push(GamePage);


        }else{
          this.showAlert('Ops!', 'E-mail ou Senha inválidos!');
        }
      }, (alertf) =>{alert(alertf)} );
    }
  }

  showAlert(title:string, text:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  createLoading () {
    this.loader = this.loadingCtrl.create({
      content: "Carregando"
    });
    this.loader.present();
  }

}
