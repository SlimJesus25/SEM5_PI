import { Service, Inject } from 'typedi';
import config from "../../config";
import ISalaDTO from '../dto/ISalaDTO';
import { Sala } from "../domain/sala";
import ISalaRepo from '../services/IRepos/ISalaRepo';
import ISalaService from './IServices/ISalaService';
import { Result } from "../core/logic/Result";
import { SalaMap } from "../mappers/SalaMap";
import { CategoriaSala } from '../domain/categoriaSala';
import IPisoRepo from './IRepos/IPisoRepo';

@Service()
export default class SalaService implements ISalaService {
  constructor(
    @Inject(config.repos.sala.name) private salaRepo: ISalaRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) { }

  public async getSala(salaId: string): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDomainId(salaId);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala not found");
      }
      else {
        const salaDTOResult = SalaMap.toDTO(sala) as ISalaDTO;
        return Result.ok<ISalaDTO>(salaDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }


  public async createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {

      const sala = await this.salaRepo.findByDesignacao(salaDTO.designacao);

      if (sala != null)
        return Result.fail<ISalaDTO>("Já existe uma sala com o nome " + sala.designacao);

      const categoria = Object.keys(CategoriaSala).find(key => CategoriaSala[key] === salaDTO.categoria);

      const piso = await this.pisoRepo.findByDesignacao(salaDTO.piso);

      if (piso == null)
        return Result.fail<ISalaDTO>("Não existe um piso com a designação " + salaDTO.piso);

      const salaOrError = Sala.create({
        "descricaoSala": salaDTO.descricao,
        "categoriaSala": CategoriaSala[categoria],
        "designacaoSala": salaDTO.designacao,
        "piso": piso
      });

      if (salaOrError.isFailure) {
        return Result.fail<ISalaDTO>(salaOrError.errorValue());
      }

      const salaResult = salaOrError.getValue();

      await this.salaRepo.save(salaResult);

      const roleDTOResult = SalaMap.toDTO(salaResult) as ISalaDTO;
      return Result.ok<ISalaDTO>(roleDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDesignacao(salaDTO.designacao);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala não encontrada");
      } else {
        const categoria = Object.keys(CategoriaSala).find(key => CategoriaSala[key] === salaDTO.categoria);
        const piso = await this.pisoRepo.findByDesignacao(salaDTO.piso);

        if (piso == null)
          return Result.fail<ISalaDTO>("Não existe um piso com a designação " + salaDTO.piso);

        sala.descricao = salaDTO.descricao;
        sala.categoria = CategoriaSala[categoria];
        sala.designacao = salaDTO.designacao;
        sala.piso = piso;
        await this.salaRepo.save(sala);

        const salaDTOResult = SalaMap.toDTO(sala) as ISalaDTO;
        return Result.ok<ISalaDTO>(salaDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

}
