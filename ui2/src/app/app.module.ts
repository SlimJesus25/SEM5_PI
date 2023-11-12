import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MessagesComponent } from './component/messages/messages.component';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appcomponent/app.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';
import { EdificioUpdateComponent } from './component/edificio/edificio-update/edificio-update.component';


//Main menu
import { AdminComponent } from './component/main-menu/admin/admin.component';
import { GestorFrotaComponent } from './component/main-menu/gestor-frota/gestor-frota.component';
import { GestorCampusComponent } from './component/main-menu/gestor-campus/gestor-campus.component';
import { TarefaGeralComponent } from './component/tarefa/tarefa-geral/tarefa-geral.component';
import { TarefaCreateComponent } from './component/tarefa/tarefa-create/tarefa-create.component';
import { TipoRoboGeralComponent } from './component/tipo-robo/tipo-robo-geral/tipo-robo-geral.component';
import { TipoRoboCreateComponent } from './component/tipo-robo/tipo-robo-create/tipo-robo-create.component';
import { TipoRoboListComponent } from './component/tipo-robo/tipo-robo-list/tipo-robo-list.component';
import { TipoRoboUpdateComponent } from './component/tipo-robo/tipo-robo-update/tipo-robo-update.component';
import { RoboGeralComponent } from './component/robo/robo-geral/robo-geral.component';
import { RoboCreateComponent } from './component/robo/robo-create/robo-create.component';
import { RoboListComponent } from './component/robo/robo-list/robo-list.component';
import { RoboUpdateComponent } from './component/robo/robo-update/robo-update.component';
import { RoboInhibitComponent } from './component/robo/robo-inhibit/robo-inhibit.component';

//Tarefa

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    AppComponent,
    MessagesComponent,

    //Edificio
    EdificioGeralComponent,
    EdificioCreateComponent,
    EdificioListComponent,
    EdificioUpdateComponent,

    //Tarefa
    TarefaGeralComponent,
    TarefaCreateComponent,

    //TipoRobo
    TipoRoboGeralComponent,
    TipoRoboCreateComponent,
    TipoRoboListComponent,
    TipoRoboUpdateComponent,

    //Robo
    RoboGeralComponent,
    RoboCreateComponent,
    RoboListComponent,
    RoboUpdateComponent,
    RoboInhibitComponent,


    //Main menu
    AdminComponent,
    GestorFrotaComponent,
    GestorCampusComponent


  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
