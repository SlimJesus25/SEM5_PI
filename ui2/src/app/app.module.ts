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

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appcomponent/app.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';
import { MessagesComponent } from './component/messages/messages.component';

//Main menu
import { AdminComponent } from './component/main-menu/admin/admin.component';
import { GestorFrotaComponent } from './component/main-menu/gestor-frota/gestor-frota.component';
import { GestorCampusComponent } from './component/main-menu/gestor-campus/gestor-campus.component';
import { EdificioUpdateComponent } from './component/edificio/edificio-update/edificio-update.component';

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

    //Main menu
    AdminComponent,
    GestorFrotaComponent,
    GestorCampusComponent


  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
