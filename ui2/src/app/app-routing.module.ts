import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';
import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';

const routes: Routes = [

  // Edificio
  { path: 'edificios', component: EdificioGeralComponent },
  { path: 'edificioCreate', component: EdificioCreateComponent},
  { path: 'edificioList', component: EdificioListComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
