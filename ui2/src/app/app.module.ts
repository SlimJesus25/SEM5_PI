import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appcomponent/app.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { MessagesComponent } from './component/messages/messages.component';

//Main menu
import { AdminComponent } from './component/main-menu/admin/admin.component';
import { GestorFrotaComponent } from './component/main-menu/gestor-frota/gestor-frota.component';
import { GestorCampusComponent } from './component/main-menu/gestor-campus/gestor-campus.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,

  ],
  declarations: [
    AppComponent,
    MessagesComponent,

    //Edificio
    EdificioGeralComponent,
    EdificioCreateComponent,

    //Main menu
    AdminComponent,
    GestorFrotaComponent,
    GestorCampusComponent


  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
