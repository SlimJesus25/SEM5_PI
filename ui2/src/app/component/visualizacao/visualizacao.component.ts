import { Component, OnInit, Output } from '@angular/core';
import * as THREE from "three";
import ThumbRaiser from './thumb_raiser';
import Orientation from './orientation';
import { Edificio } from '../../model/edificio'
import { Piso } from '../../model/piso'
import { EdificioService } from '../../service/edificio/edificio.service';
import { PisoService } from '../../service/piso/piso.service';
import { MapaPisoService } from '../../service/mapaPiso/mapaPiso.service';
import { MapaPiso } from '../../model/mapaPiso';
import IMapaPiso from '../../model/IMapaPiso';
import IMapaPisoFinal from '../../model/IMapaFinalPiso'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
  providers: [EdificioService, PisoService, MapaPisoService]
})
export class VisualizacaoComponent implements OnInit {

  constructor(private edificioService: EdificioService, private pisoService: PisoService, private mapaPisoService: MapaPisoService) {

  }


  thumbRaiser!: ThumbRaiser;

  edificios: Edificio[] = [];
  codigoEdificio: string = "";
  pisos: Piso[] = [];
  designacaoPiso: string = "";


  initialize(mapaPiso: MapaPiso) {

    // Create the game
    this.thumbRaiser = new ThumbRaiser(


      {}, // General Parameters
      { scale: new THREE.Vector3(1.0, 1, 1.0), mazeData: this.updateFloorFile(mapaPiso) }, // Maze parameters
      {}, // Player parameters
      { ambientLight: { intensity: 0.1 }, pointLight1: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(-3.5, 10.0, 2.5) }, pointLight2: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(3.5, 10.0, -2.5) } }, // Lights parameters
      {}, // Fog parameters
      { view: "fixed", multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5) }, // Fixed view camera parameters
      { view: "first-person", multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // First-person view camera parameters
      { view: "third-person", multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // Third-person view camera parameters
      { view: "top", multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0 }, // Top view camera parameters
      { view: "mini-map", multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64 } // Mini-msp view camera parameters
    );
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // Update the game
    this.thumbRaiser.update();
  }

  listPisos(codigoEdificio: string) {
    this.pisoService.listPisos(codigoEdificio).subscribe((pisos: Piso[]) => {
      this.pisos = pisos;
    });

  }

  getMapaPiso(desginacaoPiso: string): Observable<MapaPiso> {

    /*
    this.mapaPisoService.getMapasPiso().subscribe((mapas) => {
      mapas.forEach(m => {
        if(m.piso === this.designacaoPiso)
          return m;
      });
    })*/

    return this.mapaPisoService.getMapasPiso().pipe(
      map((mapas: MapaPiso[]) => {
        // console.log("MAPAPISO: " + mapas[0].elevador);
        const ms = mapas.find(v => v.piso === desginacaoPiso);
        // console.log("Found: " + ms?.piso);
        return ms!;
      })
    );

    /*
    let ms: any;

    this.mapaPisoService.getMapasPiso().subscribe((mapas: MapaPiso[]) => {
      console.log(mapas);
      mapas.forEach(v => {
        if (v.piso == desginacaoPiso) {
          console.log("Aqui: " + v.piso);
          ms = v;
        }
      });
    });

    console.log("Aqui2: " + ms);

    return ms!;
    */

  }

  ngOnInit(): void {
    this.edificioService.getEdificios().subscribe((edificios: Edificio[]) => {
      this.edificios = edificios;
    });

    //this.initialize();
    //this.animate();
  }

  ngOnDestroy(): void {
    this.thumbRaiser.destroy();
  }

  renderCanvas(): void {

    const piso = this.pisos.find((piso: Piso) => piso.designacao == this.designacaoPiso);

    const mapa = this.getMapaPiso(piso!.designacao).subscribe((res) => {
      console.log("Res: " + res.mapa);
      this.initialize(res);
      this.animate();
    });

  }

  updateFloorFile(mapa: MapaPiso): IMapaPisoFinal {

    /*const a = {
      maze: {
        size: {
          width: m.maze.size.width,
          height: m.maze.size.height,
          depth: m.maze.size.depth,
        },
        map: m.maze.map,
        exits: m.maze.exits,
        elevators: m.maze.elevators,
        rooms: m.maze.rooms,
        exitLocation: m.maze.exitLocation,
      },
      ground: {
        size: {
          width: m.ground.size.width,
          height: m.ground.size.height,
          depth: m.ground.size.depth,
        },
        segments: {
          width: m.ground.segments.width,
          height: m.ground.segments.height,
          depth: m.ground.segments.depth,
        },
        primaryColor: m.ground.primaryColor,
        maps: {
          color: {
            url: m.ground.maps.color.url,
          },
          ao: {
            url: m.ground.maps.ao.url,
            intensity: m.ground.maps.ao.intensity,
          },
          displacement: {
            url: m.ground.maps.displacement.url,
            scale: m.ground.maps.displacement.scale,
            bias: m.ground.maps.displacement.bias,
          },
          normal: {
            url: m.ground.maps.normal.url,
            type: m.ground.maps.normal.type,
            scale: {
              x: m.ground.maps.normal.scale.x,
              y: m.ground.maps.normal.scale.y,
            },
          },
          bump: {
            url: m.ground.maps.bump.url,
            scale: m.ground.maps.bump.scale,
          },
          roughness: {
            url: m.ground.maps.roughness.url,
            rough: m.ground.maps.roughness.rough,
          },
        },
        wrapS: m.ground.wrapS,
        wrapT: m.ground.wrapT,
        repeat: {
          u: m.ground.repeat.u,
          v: m.ground.repeat.v,
        },
        magFilter: m.ground.magFilter,
        minFilter: m.ground.minFilter,
        secondaryColor: m.ground.secondaryColor,
      },
      wall: {
        segments: {
          width: m.wall.segments.width,
          height: m.wall.segments.height,
          depth: m.wall.segments.depth,
        },
        primaryColor: m.wall.primaryColor,
        maps: {
          color: {
            url: m.wall.maps.color.url,
          },
          ao: {
            url: m.wall.maps.ao.url,
            intensity: m.wall.maps.ao.intensity,
          },
          displacement: {
            url: m.wall.maps.displacement.url,
            scale: m.wall.maps.displacement.scale,
            bias: m.wall.maps.displacement.bias,
          },
          normal: {
            url: m.wall.maps.normal.url,
            type: m.wall.maps.normal.type,
            scale: {
              x: m.wall.maps.normal.scale.x,
              y: m.wall.maps.normal.scale.y,
            },
          },
          bump: {
            url: m.wall.maps.bump.url,
            scale: m.wall.maps.bump.scale,
          },
          roughness: {
            url: m.wall.maps.roughness.url,
            rough: m.wall.maps.roughness.rough,
          },
        },
        wrapS: m.wall.wrapS,
        wrapT: m.wall.wrapT,
        repeat: {
          u: m.wall.repeat.u,
          v: m.wall.repeat.v,
        },
        magFilter: m.wall.magFilter,
        minFilter: m.wall.minFilter,
        secondaryColor: m.wall.secondaryColor,
      },
      player: {
        initialPosition: m.player.initialPosition,
        initialDirection: m.player.initialDirection,
      },
    };*/
    /*
    return {
      groundTextureUrl: "../../assets/textures/ground.jpg",
      wallTextureUrl: "../../assets/textures/wall.jpg",
      size: { width: a.maze.size.width, height: a.maze.size.height},
      map: a.maze.map,
      initialPosition: a.player.initialPosition,
      initialDirection: a.player.initialDirection,
      exitLocation: a.maze.exitLocation
    } as IMapaPisoFinal;*/

    console.log("1." + mapa.largura + "\n2. " + mapa.profundidade);

    return {
      groundTextureUrl: "../../assets/texture/ground.jpg",
      wallTextureUrl: "../../assets/texture/wall.png",
      size: { width: mapa.largura+1, height: mapa.profundidade+1 },
      map: mapa.mapa,
      initialPosition: [3,3],
      initialDirection: [0,3],
      exitLocation: mapa.saidaLocalizacao
    }as IMapaPisoFinal;

  }
}