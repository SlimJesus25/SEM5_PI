import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import edificio from './routes/edificioRoute';
import passagem from './routes/passagemRoute';
import piso from './routes/pisoRoute';
import sala from './routes/salaRoute';
import elevador from './routes/elevadorRoute';
import robo from './routes/roboRoute';
import tipoRobo from './routes/tipoRoboRoute';
import mapaPiso from './routes/mapaPisoRoute';
import tarefa from './routes/tarefaRoute';


export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	passagem(app);
	piso(app);
	edificio(app);
	sala(app);
	elevador(app);
	robo(app);
	tipoRobo(app);
	mapaPiso(app);
	tarefa(app);
	
	return app
}