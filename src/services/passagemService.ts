import { Service, Inject } from 'typedi';
import config from "../../config";
import IPassagemDTO from '../dto/IPassagemDTO';
import { Passagem } from "../domain/passagem";
import IPassagemRepo from '../services/IRepos/IPassagemRepo';
import IPassagemService from './IServices/IPassagemService';
import { Result } from "../core/logic/Result";
import { PassagemMap } from "../mappers/PassagemMap";
import IEdificioRepo from './IRepos/IEdificioRepo';
import { PassagemId } from '../domain/passagemId';
import IPisoRepo from './IRepos/IPisoRepo';
import IListPassagensEntreEdificiosDTO from '../dto/IListPassagensEntreEdificiosDTO';
import IListPisosComPassagemDTO from '../dto/IListPisosComPassagemDTO';
import IPisoDTO from '../dto/IPisoDTO';
import { Piso } from '../domain/piso';
import { PisoId } from '../domain/pisoId';
import passagemSchema from '../persistence/schemas/passagemSchema';

@Service()
export default class PassagemService implements IPassagemService {
  constructor(
      @Inject(config.repos.passagem.name) private passagemRepo : IPassagemRepo,
      @Inject(config.repos.edificio.name) private edificioRepo : IEdificioRepo,
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo
  ) {}

  public async getPassagem( passagemId: string): Promise<Result<IPassagemDTO>> {
    return null;
  }


  public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {

      const passagemDocument = await this.passagemRepo.findByDomainId(passagemDTO.id);

      if(!!passagemDocument)
        return Result.fail<IPassagemDTO>("Passagem com o id " + passagemDTO.id + " já existe!");

      const passagemOrError = Passagem.create({
        designacao: passagemDTO.designacao,
        edificioA: await this.edificioRepo.findByCodigo(passagemDTO.edificioOrigem),
        edificioB: await this.edificioRepo.findByCodigo(passagemDTO.edificioDestino),
        pisoA: await this.pisoRepo.findByDesignacao(passagemDTO.pisoOrigem),
        pisoB: await this.pisoRepo.findByDesignacao(passagemDTO.pisoDestino)
      });// await Passagem.create( passagemDTO ); // Venancio: alterei o create do passagem, vamos tentar utilizar o que está neste momento em todas as classes (pelo menos as que tenham atributos objetos).

      if (passagemOrError.isFailure) {
        return Result.fail<IPassagemDTO>(passagemOrError.errorValue());
      }

      const passagemResult = passagemOrError.getValue();

      await this.passagemRepo.save(passagemResult);

      const passagemDTOResult = PassagemMap.toDTO( passagemResult ) as IPassagemDTO;
      return Result.ok<IPassagemDTO>( passagemDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {
      const passagem = await this.passagemRepo.findByDomainId(passagemDTO.id);
      const edificioA = await this.edificioRepo.findByCodigo(passagemDTO.edificioOrigem);
      const edificioB = await this.edificioRepo.findByCodigo(passagemDTO.edificioDestino);
      const pisoA = await this.pisoRepo.findByDesignacao(passagemDTO.pisoOrigem);
      const pisoB = await this.pisoRepo.findByDesignacao(passagemDTO.pisoOrigem);

      if (passagem === null) {
        return Result.fail<IPassagemDTO>("Passagem não encontrada");
      }
      else {
        passagem.edificioUm = edificioA;
        passagem.edificioDois = edificioB;
        passagem.pisoUm = pisoA;
        passagem.pisoDois = pisoB;
        await this.passagemRepo.save(passagem);

        const passagemDTOResult = PassagemMap.toDTO( passagem ) as IPassagemDTO;
        return Result.ok<IPassagemDTO>( passagemDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  // codigoEdificioA: string, codigoEdificioB: string
  public async listPassagens(edificios : IListPassagensEntreEdificiosDTO): Promise<Result<IPassagemDTO[]>> {
    try {

        const edificioADoc = await this.edificioRepo.findByCodigo(edificios.codigoEdificioA);
        const edificioBDoc = await this.edificioRepo.findByCodigo(edificios.codigoEdificioB);
  
        if(!!edificioADoc || !!edificioBDoc)
          return Result.fail<IPassagemDTO[]>("Um dos códigos dos edifícios é inválido");
        
        const passagensResult = this.passagemRepo.listPassagensBetween(edificioADoc.codigo, edificioBDoc.codigo);
  
        let passagensResultDTO : IPassagemDTO[];

        (await passagensResult).forEach(p => passagensResultDTO.push(PassagemMap.toDTO(p) as IPassagemDTO));

        return Result.ok<IPassagemDTO[]>( passagensResultDTO )
      } catch (e) {
        throw e;
      }
  }
  
  //codigoEdificioA
  public async listPisos(edificio: IListPisosComPassagemDTO): Promise<Result<String[]>>{
    try{
      const edificioDoc = await this.edificioRepo.findByCodigo(edificio.codigoEdificio);
      
      if(!!edificioDoc)
        return Result.fail<String[]>("Código do edifício é inválido");
      
      const passagemResult = this.passagemRepo.listPassagens(edificioDoc.codigo);
      
      let passagensResultDTO : IPassagemDTO[];
      
      (await passagemResult).forEach(p => passagensResultDTO.push(PassagemMap.toDTO(p) as IPassagemDTO));
      
      return Result.ok<IPisoDTO[]>(passagensResultDTO)
  }catch(e) {
    throw e;
   }
 }
}