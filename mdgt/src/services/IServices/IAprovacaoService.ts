
import { Result } from "../../core/logic/Result";
import IAprovacaoDTO from "../../dto/IAprovacaoDTO";
import IAprovarDTO from "../../dto/IAprovarDTO";

export default interface IAprovacaoService  {
  aceitarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>>;
  recusarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>>;
  listarRequisicoesNaoAprovadas(): Promise<Result<IAprovacaoDTO[]>>;

  /**
   * TODO: Criar DTOs necessários para fazer as pesquisas filtradas...
   */
  listarPorEstado(): Promise<Result<IAprovacaoDTO>>;

  listarPorTipoDispositivo(): Promise<Result<IAprovacaoDTO>>;

  listarPorUtente(): Promise<Result<IAprovacaoDTO>>;

}