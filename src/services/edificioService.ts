import { Service, Inject } from 'typedi';
import config from "../../config";
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from "../domain/edificio";
import { Piso } from "../domain/piso";
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IMapaEdificioRepo from '../services/IRepos/IMapaEdificioRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from "../core/logic/Result";
import { EdificioMap } from "../mappers/EdificioMap";
import { CodigoEdificio } from '../domain/codigoEdificio';
import { MapaEdificio } from '../domain/mapaEdificio';


@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      //@Inject(config.repos.role.name) private edificioRepo : IEdificioRepo, // joao :repos.edificio ?
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
      @Inject(config.repos.mapaEdificio.name) private mapaRepo: IMapaEdificioRepo // joao: alterado para mapaEdifico
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

      // Venancio: Substituir isto por algo que o identifique para além do ID.
      const mapa = await this.mapaRepo.findByDomainId(edificioDTO.mapaEdificio);
    
      if (mapa == null){
        return Result.fail<IEdificioDTO>('O mapa informado nao existe');
      }
      const edificioOrError = Edificio.create({
        codigoEdificio: CodigoEdificio.create(edificioDTO.codigoEdificio).getValue(),
        descricaoEdificio: edificioDTO.descricao,
        dimensaoMaximaPiso: edificioDTO.dimensaoMaxima,
        nomeOpcionalEdificio: edificioDTO.nomeOpcional,
        mapaEdificio: mapa
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
      const mapa = await this.mapaRepo.findByDomainId(edificioDTO.mapaEdificio); // Alterar esta pesquisa por algo que o identifique para além do ID.

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }else {
        edificio.codigo = edificioDTO.codigoEdificio;
        edificio.descricao = edificioDTO.descricao;
        edificio.dimensaoMaxima = edificioDTO.dimensaoMaxima;
        edificio.mapa = mapa;
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