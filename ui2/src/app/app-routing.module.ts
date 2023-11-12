import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Edificio
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';

//Main menu
import { AdminComponent } from './component/main-menu/admin/admin.component';
import { GestorFrotaComponent } from './component/main-menu/gestor-frota/gestor-frota.component';
import { GestorCampusComponent } from './component/main-menu/gestor-campus/gestor-campus.component';
import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';
import { EdificioUpdateComponent } from './component/edificio/edificio-update/edificio-update.component';

const routes: Routes = [

  // Edificio
  { path: 'edificios', component: EdificioGeralComponent },
  { path: 'edificioCreate', component: EdificioCreateComponent},
  { path: 'edificioList', component: EdificioListComponent },
  { path: "edificioUpdate", component: EdificioUpdateComponent}
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
