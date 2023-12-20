import { Service, Inject } from 'typedi';
import config from "../../config";
import IAprovacaoDTO from '../dto/IAprovacaoDTO';
import { Aprovacao } from "../domain/aprovacao";
import IAprovacaoRepo from '../services/IRepos/IAprovacaoRepo';
import IAprovacaoService from './IServices/IAprovacaoService';
import { Result } from "../core/logic/Result";
import { AprovacaoMap } from "../mappers/AprovacaoMap";
import ITarefaRepo from './IRepos/ITarefaRepo';
import IAprovarDTO from '../dto/IAprovarDTO';

@Service()
export default class AprovacaoService implements IAprovacaoService {
    constructor(
        @Inject(config.repos.aprovacao.name) private aprovacaoRepo: IAprovacaoRepo,
        @Inject(config.repos.tarefa.name) private tarefaRepo: ITarefaRepo
    ) { }

    public async aceitarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.tarefaRepo.findByDesignacao(aprovacaoDTO.tarefa);
            if (tarefa == null)
                return Result.fail<IAprovacaoDTO>("Não foi encontrada nenhuma requisição com esta tarefa!");

            const requisicao = await this.aprovacaoRepo.findByTarefaName(aprovacaoDTO.tarefa);
            if (requisicao == null)
                return Result.fail<IAprovacaoDTO>("Aprovação já foi dada previamente!");

            requisicao.aceita();

            await this.aprovacaoRepo.save(requisicao);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(requisicao) as IAprovacaoDTO;
            return Result.ok<IAprovacaoDTO>(aprovacaoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async listarRequisicoesNaoAprovadas(): Promise<Result<IAprovacaoDTO[]>> {
        try {
            const aprovacoes = await this.aprovacaoRepo.listarRequisicoesNaoAprovadas();
            if (aprovacoes == null)
                return Result.fail<IAprovacaoDTO[]>("Não existem tarefas por aprovar!");
            

            let aprovacoesDTO: IAprovacaoDTO[] = [];
            for (let i=0;i<aprovacoes.length;i++) {
                aprovacoesDTO.push(AprovacaoMap.toDTO(aprovacoes[i]));
            }

            return Result.ok<IAprovacaoDTO[]>(aprovacoesDTO);
        }catch(e){
            throw e;
        }
    }

    public async recusarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.tarefaRepo.findByDesignacao(aprovacaoDTO.tarefa);
            if (tarefa == null) {
                return Result.fail<IAprovacaoDTO>("Tarefa não encontrada!");
            }

            const requisicao = await this.aprovacaoRepo.findByTarefaName(aprovacaoDTO.tarefa);
            if (requisicao == null) {
                return Result.fail<IAprovacaoDTO>("Aprovação já foi dada previamente!")
            }

            requisicao.rejeita();

            await this.aprovacaoRepo.save(requisicao);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(requisicao) as IAprovacaoDTO;
            return Result.ok<IAprovacaoDTO>(aprovacaoDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async listarPorEstado(): Promise<Result<IAprovacaoDTO>> {
        return null;
    }

    public async listarPorTipoDispositivo(): Promise<Result<IAprovacaoDTO>> {
        return null;
    }

    public async listarPorUtente(): Promise<Result<IAprovacaoDTO>> {
        return null;
    }

}
