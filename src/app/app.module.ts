import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AppUpdate } from '@ionic-native/app-update';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { Facebook } from '@ionic-native/facebook';

import { PlanosPage } from '../pages/planos/planos';
import { ModalPage } from '../pages/modal/modal';

import { RankingPage } from '../pages/ranking/ranking';

import { PagamentoPage } from '../pages/pagamento/pagamento';
import { PagamentoService } from '../pages/pagamento/pagamento.service';

import { ListPage } from '../pages/list/list';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { InstitucionalPage } from '../pages/institucional/institucional';

import { GamePage } from '../pages/game/game';
import { PlayerPage } from '../pages/game/player/player';
import { PlayerService } from '../pages/game/player/player.service';


import { ListGamePage } from '../pages/game/list/list';
import { ListService } from '../pages/game/list/list.service';


import { LoginService } from '../pages/login/login.service';
import { CadastroService } from '../pages/cadastro/cadastro.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
declare var window:any;
@NgModule({
    declarations: [
    MyApp,
    LoginPage,
    PagamentoPage,
    CadastroPage,
    GamePage,
    ListGamePage,
    ListPage,
    PlayerPage,
    ModalPage,
    RankingPage,
    PlanosPage,
    InstitucionalPage
    ],
    imports: [
    BrowserModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    CadastroPage,
    LoginPage,
    PagamentoPage,
    GamePage,
    ListGamePage,
    ListPage,
    PlayerPage,
    ModalPage,
    RankingPage,
    PlanosPage,
    InstitucionalPage
    ],
    providers: [
    StatusBar,
    CadastroService,
    PagamentoService,
    PlayerService,
    Facebook,
    ListService,
    LoginService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
    constructor(private appUpdate: AppUpdate) {
        
        const updateUrl = 'http://www.fastclickapp.com.br/app_updates/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl).then(() => { 
            alert("Por favor atualize seu Aplicativo.");
         });
        var versionCode = window.AppVersion.build;
        console.log(versionCode);
    }
}
