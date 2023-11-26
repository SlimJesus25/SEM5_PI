import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('myCanvas') private canvasRef!: ElementRef;
  @ViewChild('fileInput') fileInput: any;
  private animationId: number | null = null;
  //public file: File | undefined;
  

  constructor(private edificioService: EdificioService, private pisoService: PisoService, private mapaPisoService: MapaPisoService) {
  }

  /*onFileSelected(event: any) {
    this.file= event.target.files[0];
  }*/


  thumbRaiser!: ThumbRaiser;

  edificios: Edificio[] = [];
  codigoEdificio: string = "";
  pisos: Piso[] = [];
  designacaoPiso: string = "";


  initialize(mapaPiso: MapaPiso) {

    // Create the game
    this.thumbRaiser = new ThumbRaiser(
      this.canvas,
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
    return this.mapaPisoService.getMapasPiso().pipe(
      map((mapas: MapaPiso[]) => {
        const ms = mapas.find(v => v.piso === desginacaoPiso);
        return ms!;
      })
    );
  }

  ngOnInit(): void {
    this.edificioService.getEdificios().subscribe((edificios: Edificio[]) => {
      this.edificios = edificios;
    });
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.canvas.parentElement?.removeChild(this.canvas);
    if (this.thumbRaiser.userInterface) {
      this.thumbRaiser.userInterface.gui.destroy();
    }
  }


  renderCanvas(): void {
    const piso = this.pisos.find((piso: Piso) => piso.designacao == this.designacaoPiso);
    const mapa = this.getMapaPiso(piso!.designacao).subscribe((res) => {
      //console.log("Res: " + res.mapa);
      this.initialize(res);
      this.animate();
    });

  }

  updateFloorFile(mapa: MapaPiso): IMapaPisoFinal {
    return {
      groundTextureUrl: "../../assets/textures/ground.jpg",
      wallTextureUrl: "../../assets/textures/wall.jpg",
      size: { width: mapa.largura, height: mapa.profundidade },
      map: mapa.mapa,
      initialPosition: [5, 5],
      initialDirection: 0.0,
      exitLocation: [-1,-1]
    } as IMapaPisoFinal;
  }
}