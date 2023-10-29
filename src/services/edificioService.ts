import { Service, Inject } from 'typedi';
import config from "../../config";
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from "../domain/edificio";
import { Piso } from "../domain/piso";
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IMapaEdificioRepo from './IRepos/IMapaPisoRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from "../core/logic/Result";
import { EdificioMap } from "../mappers/EdificioMap";
import { CodigoEdificio } from '../domain/codigoEdificio';

@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      //@Inject(config.repos.role.name) private edificioRepo : IEdificioRepo, // joao :repos.edificio ?
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
  ) {}

  public async getEdificio( edificioId: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByDomainId(edificioId);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }
      else {
        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {

      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      if(edificio != null)
        return Result.fail<IEdificioDTO>("Edifício com o código " + edificioDTO.codigoEdificio + " já existe!");

      const codigo = CodigoEdificio.create(edificioDTO.codigoEdificio).getValue();
      const descricao = edificioDTO.descricaoEdificio;
      const dimensao = edificioDTO.dimensaoMaximaEdificio;
      const nomeOpcional = edificioDTO.nomeOpcionalEdificio;


      const edificioOrError = Edificio.create({
        codigoEdificio: codigo,
        descricaoEdificio: descricao,
        dimensaoMaximaPiso: dimensao,
        nomeOpcionalEdificio: nomeOpcional
      });

      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.edificioRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO( edificioResult ) as IEdificioDTO;
      return Result.ok<IEdificioDTO>( edificioDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }else {
        edificio.codigo = edificioDTO.codigoEdificio;
        edificio.descricao = edificioDTO.descricaoEdificio;
        edificio.dimensaoMaxima = edificioDTO.dimensaoMaximaEdificio;
        await this.edificioRepo.save(edificio);

        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listEdificios(): Promise<Result<IEdificioDTO[]>> {
    try {

        const edificios = await this.edificioRepo.findAll();

        if (!!edificios){
          return Result.fail<IEdificioDTO[]>("Não existem registos de edifícios");
        }
        
        let edificiosDTO : IEdificioDTO[];

        (await edificios).forEach(p => edificiosDTO.push(EdificioMap.toDTO(p) as IEdificioDTO));

        return Result.ok<IEdificioDTO[]>( edificiosDTO )
      } catch (e) {
        throw e;
      }
  }


}