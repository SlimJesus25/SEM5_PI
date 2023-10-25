import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoboDTO from '../dto/IRoboDTO';
import { Robo } from "../domain/robo";
import IRoboRepo from '../services/IRepos/IRoboRepo';
import IRoboService from './IServices/IRoboService';
import { Result } from "../core/logic/Result";
import { RoboMap } from "../mappers/RoboMap";
import { EstadoRobo } from '../domain/estadoRobo';
import { create } from 'lodash';
import { NumeroSerieRobo } from '../domain/numeroSerieRobo';
import { MarcaRobo } from '../domain/marcaRobo';
import { CodigoRobo } from '../domain/codigoRobo';
import { TipoRobo } from '../domain/tipoRobo';
import ITipoRoboRepo from './IRepos/ITipoRoboRepo';

@Service()
export default class RoboService implements IRoboService {
  constructor(
      @Inject(config.repos.robo.name) private roboRepo : IRoboRepo
      @Inject(config.repos.tipoRobo.name) private tipoRoboRepo : ITipoRoboRepo
  ) {}

  public async createRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>> {
    try {

      const roboDocument = await this.roboRepo.findByCodigo(roboDTO.codigo);

    if(!!roboDocument)
        return Result.fail<IRoboDTO>("Já existe um robo com o código " + roboDTO.codigo);

    const estado = Object.keys(EstadoRobo).find(key => EstadoRobo[key] === roboDTO.estado);
    const tipo = await this.tipoRoboRepo.findByDesignacao(roboDTO.tipoRobo);
        
      const roboOrError = Robo.create({
        estado: EstadoRobo[estado],
        marca: MarcaRobo.create(roboDTO.marca).getValue(),
        codigo: CodigoRobo.create(roboDTO.codigo).getValue(),
        numeroSerie: NumeroSerieRobo.create(roboDTO.numeroSerie).getValue(),
        nickname: roboDTO.nickname,
        tipoRobo: tipo
      })

      if (roboOrError.isFailure) {
        return Result.fail<IRoboDTO>(roboOrError.errorValue());
      }

      const roboResult = roboOrError.getValue();
      await this.roboRepo.save(roboResult);

      const roboDTOResult = RoboMap.toDTO( roboResult ) as IRoboDTO;
      return Result.ok<IRoboDTO>( roboDTOResult )
    } catch (e) {
      throw e;
    }
  }

}
