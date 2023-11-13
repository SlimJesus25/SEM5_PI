import { Result } from "../../core/logic/Result";
import IPisoDTO from "../../dto/IPisoDTO";
import IMapaPisoDTO from "../../dto/IMapaPisoDTO";
import IMazeDTO from "../../dto/IMazeDTO";
import IDeleteMapaPisoDTO from "../../dto/IDeleteMapaPisoDTO";


export default interface IMapaPisoService  {
    createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    loadMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    deleteMapaPiso(piso: IDeleteMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    listMapasPiso(): Promise<Result<IMazeDTO[]>>;

}
