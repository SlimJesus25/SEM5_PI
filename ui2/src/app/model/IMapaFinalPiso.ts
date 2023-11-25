export default interface IMapaPisoFinal {

    size: {
        width: number;
        height: number;
    };

    map: number[][];
    exits: number[][];
    elevators: number[][];
    rooms: number[][];
    exitLocation: number[];

    groundTextureUrl: string;
    wallTextureUrl: string;

    initialPosition: number[];
    initialDirection: number[];
}
