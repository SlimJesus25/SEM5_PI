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
import { TarefaGeralComponent } from './component/appcomponent/tarefa/tarefa-geral/tarefa-geral.component';
import { TarefaCreateComponent } from './component/appcomponent/tarefa/tarefa-create/tarefa-create.component';
import { TipoRoboGeralComponent } from './component/appcomponent/tipo-robo/tipo-robo-geral/tipo-robo-geral.component';
import { TipoRoboCreateComponent } from './component/appcomponent/tipo-robo/tipo-robo-create/tipo-robo-create.component';
import { TipoRoboUpdateComponent } from './component/appcomponent/tipo-robo/tipo-robo-update/tipo-robo-update.component';
import { TipoRoboListComponent } from './component/appcomponent/tipo-robo/tipo-robo-list/tipo-robo-list.component';

const routes: Routes = [

  // Edificio
  { path: 'edificios', component: EdificioGeralComponent },
  { path: 'edificioCreate', component: EdificioCreateComponent},
  { path: 'edificioList', component: EdificioListComponent },
  { path: "edificioUpdate", component: EdificioUpdateComponent},

  //Main menu
  { path: "admin", component: AdminComponent},
  { path: "gestor-Frota", component: GestorFrotaComponent},
  { path: "gestor-Campus", component: GestorCampusComponent},


  { path: "edificioUpdate", component: EdificioUpdateComponent},

  //Tarefa
  { path: 'tarefas', component: TarefaGeralComponent},
  { path: 'tarefaCreate', component: TarefaCreateComponent},

  //TipoRobo
  { path: 'tiposRobo', component: TipoRoboGeralComponent},
  { path: 'tipoRoboCreate', component: TipoRoboCreateComponent},
  { path: 'tipoRoboUpdate', component: TipoRoboUpdateComponent},
  { path: 'tipoRoboList', component: TipoRoboListComponent},
  
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
