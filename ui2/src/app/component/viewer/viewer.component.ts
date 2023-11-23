
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
//import { SharedService } from 'src/app/service/SharedService';
import * as THREE from "three";
import Orientation from "./orientation";
import ThumbRaiser from "./thumb_raiser";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit, OnDestroy{

  constructor(/*private sharedService: SharedService*/) {}

  thumbRaiser!: ThumbRaiser;
  
  initialize() {
    // Create the game
   this.thumbRaiser = new ThumbRaiser(
        {}, // General Parameters
        { scale: new THREE.Vector3(1.0, 1, 1.0) }, // Maze parameters
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

  ngOnInit(): void {
    this.initialize();
    this.animate();
  }

  ngOnDestroy(): void {
   this.thumbRaiser.destroy();
  }
}

