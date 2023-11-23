import { NgModule, ɵsetInjectorProfilerContext } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Edificio
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';

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
import { PisoListComponent } from './component/piso/piso-list/piso-list.component';
import { PisoCreateComponent } from './component/piso/piso-create/piso-create.component';
import { PisoUpdateComponent } from './component/piso/piso-update/piso-update.component';

//Passagem
import { PassagemGeralComponent } from './component/passagem/passagem-geral/passagem-geral.component';
import { PassagemCreateComponent } from './component/passagem/passagem-create/passagem-create.component';

//Elevador
import { ElevadorGeralComponent } from './component/elevador/elevador-geral/elevador-geral.component';
import { ElevadorUpdateComponent } from './component/elevador/elevador-update/elevador-update.component';
import { ElevadorListComponent } from './component/elevador/elevador-list/elevador-list.component';
import { ElevadorCreateComponent } from './component/elevador/elevador-create/elevador-create.component';

import { LoginComponent } from './component/login/login.component';
import { MapaPisoCreateComponent } from './component/mapa-piso/mapa-piso-create/mapa-piso-create.component';
import { MapaPisoUpdateComponent } from './component/mapa-piso/mapa-piso-update/mapa-piso-update.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { PassagemListComponent } from './component/passagem/passagem-list/passagem-list.component';
import { PassagemUpdateComponent } from './component/passagem/passagem-update/passagem-update.component';
import { SalaCreateComponent } from './component/sala/sala-create/sala-create.component';
import { PlanningComponent } from './component/planeamento/planning.component';

const routes: Routes = [

  // Edificio
  { path: 'edificios', component: EdificioGeralComponent },
  { path: 'edificioCreate', component: EdificioCreateComponent },
  { path: 'edificioList', component: EdificioListComponent },
  { path: "edificioUpdate", component: EdificioUpdateComponent },

  //Tarefa
  { path: 'tarefas', component: TarefaGeralComponent },
  { path: 'tarefaCreate', component: TarefaCreateComponent },

  //TipoRobo
  { path: 'tiposRobo', component: TipoRoboGeralComponent },
  { path: 'tipoRoboCreate', component: TipoRoboCreateComponent },
  { path: 'tipoRoboUpdate', component: TipoRoboUpdateComponent },
  { path: 'tipoRoboList', component: TipoRoboListComponent },


  //Robo
  { path: "robos", component: RoboGeralComponent },
  { path: "roboCreate", component: RoboCreateComponent },
  { path: "roboList", component: RoboListComponent },
  { path: "roboUpdate", component: RoboUpdateComponent },
  { path: "inhibitRobo", component: RoboInhibitComponent },


  //Piso
  { path: 'pisos', component: PisoGeralComponent },
  { path: 'pisoList', component: PisoListComponent },
  { path: 'pisoCreate', component: PisoCreateComponent },
  { path: "pisoUpdate", component: PisoUpdateComponent },

  //Passagem
  { path: 'passagens', component: PassagemGeralComponent },
  { path: 'passagemCreate', component: PassagemCreateComponent },
  { path: 'passagemList', component: PassagemListComponent },
  { path: 'passagemUpdate', component: PassagemUpdateComponent },

  //Elevador
  { path: 'elevadores', component: ElevadorGeralComponent },
  { path: "elevadorUpdate", component: ElevadorUpdateComponent },
  { path: "elevadorList", component: ElevadorListComponent },
  { path: "elevadorCreate", component: ElevadorCreateComponent },

  //MapaPiso
  //{ path: 'mapasPisos', component: MapaPisoGeralComponent},
  { path: 'mapaPisoCreate', component: MapaPisoCreateComponent },
  { path: 'mapaPisoUpdate', component: MapaPisoUpdateComponent },

  //Sala
  { path: 'salaCreate', component: SalaCreateComponent },

  { path: 'login', component: LoginComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'mainMenu', component: MainMenuComponent },

  { path: 'planning', component: PlanningComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
