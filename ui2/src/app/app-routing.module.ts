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
import { TarefaCreateComponent } from './component/tarefa/tarefa-create/tarefa-create.component';
import { TarefaGeralComponent } from './component/tarefa/tarefa-geral/tarefa-geral.component';
import { TipoRoboGeralComponent } from './component/tipo-robo/tipo-robo-geral/tipo-robo-geral.component';
import { TipoRoboCreateComponent } from './component/tipo-robo/tipo-robo-create/tipo-robo-create.component';
import { RoboGeralComponent } from './component/robo/robo-geral/robo-geral.component';
import { RoboCreateComponent } from './component/robo/robo-create/robo-create.component';
import { TipoRoboListComponent } from './component/tipo-robo/tipo-robo-list/tipo-robo-list.component';
import { RoboListComponent } from './component/robo/robo-list/robo-list.component';
import { TipoRoboUpdateComponent } from './component/tipo-robo/tipo-robo-update/tipo-robo-update.component';
import { RoboUpdateComponent } from './component/robo/robo-update/robo-update.component';
import { RoboInhibitComponent } from './component/robo/robo-inhibit/robo-inhibit.component';

//Piso
import { PisoGeralComponent } from './component/piso/piso-geral/piso-geral.component';
//import { PisoListComponent } from './component/piso/piso-list/piso-list.component';
import { PisoCreateComponent } from './component/piso/piso-create/piso-create.component';

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


  //Robo
  { path: "robos", component: RoboGeralComponent},
  { path: "roboCreate", component: RoboCreateComponent},
  { path: "listRobo", component: RoboListComponent},
  { path: "roboUpdate", component: RoboUpdateComponent},
  { path: "inhibitRobo", component: RoboInhibitComponent},


  //Piso
  { path: 'pisos', component: PisoGeralComponent },
  //{ path: 'pisoList', component: PisoListComponent },
  { path: 'pisoCreate', component: PisoCreateComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
