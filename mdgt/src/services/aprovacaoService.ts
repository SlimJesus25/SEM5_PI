import { Service, Inject } from 'typedi';
import config from "../../config";
import IAprovacaoDTO from '../dto/IAprovacaoDTO';
import { Aprovacao } from "../domain/aprovacao";
import IAprovacaoRepo from '../services/IRepos/IAprovacaoRepo';
import IAprovacaoService from './IServices/IAprovacaoService';
import { Result } from "../core/logic/Result";
import { AprovacaoMap } from "../mappers/AprovacaoMap";
import ITarefaRepo from './IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';

@Service()
export default class AprovacaoService implements IAprovacaoService {
    constructor(
        @Inject(config.repos.aprovacao.name) private aprovacaoRepo: IAprovacaoRepo,
        @Inject(config.repos.tarefa.name) private tarefaRepo : ITarefaRepo
        ) { }

    private async procuraTarefa(designacaoTarefa : string) : Promise<Tarefa> {
        const tarefa = await this.tarefaRepo.findByDesignacao(designacaoTarefa);
        return tarefa;
    }

    public async aceitarRequisicao(aprovacaoDTO: IAprovacaoDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.procuraTarefa(aprovacaoDTO.tarefa);
            if (tarefa == null){
                return Result.fail<IAprovacaoDTO>("Tarefa não encontrada!");
            }

            const aprovacaoOrError = Aprovacao.create({
                estado: "aceite",
                requisitante: aprovacaoDTO.requisitante,
                tipoDispositivo: aprovacaoDTO.tipoDispositivo,
                tarefa: tarefa
            });

            if (aprovacaoOrError.isFailure) {
                return Result.fail<IAprovacaoDTO>(aprovacaoOrError.errorValue());
            }

            const aprovacaoResult = aprovacaoOrError.getValue();

            await this.aprovacaoRepo.save(aprovacaoResult);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(aprovacaoResult) as IAprovacaoDTO;
            return Result.ok<IAprovacaoDTO>(aprovacaoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async recusarRequisicao(aprovacaoDTO: IAprovacaoDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.procuraTarefa(aprovacaoDTO.tarefa);
            if (tarefa == null){
                return Result.fail<IAprovacaoDTO>("Tarefa não encontrada!");
            }

            const aprovacaoOrError = await Aprovacao.create({
                estado: "recusado",
                requisitante: aprovacaoDTO.requisitante,
                tipoDispositivo: aprovacaoDTO.tipoDispositivo,
                tarefa: tarefa
            });

            if (aprovacaoOrError.isFailure) {
                return Result.fail<IAprovacaoDTO>(aprovacaoOrError.errorValue());
            }

            const aprovacaoResult = aprovacaoOrError.getValue();

            await this.aprovacaoRepo.save(aprovacaoResult);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(aprovacaoResult) as IAprovacaoDTO;
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