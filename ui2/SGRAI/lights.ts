import * as THREE from "three";

interface LightsParameters {
    ambientLight: { color: number; intensity: number };
    pointLight1: { color: number; intensity: number; distance: number; position: THREE.Vector3 };
    pointLight2: { color: number; intensity: number; distance: number; position: THREE.Vector3 };
    spotLight: { color: number; intensity: number; distance: number; angle: number; penumbra: number; position: THREE.Vector3; direction: number };
}

export default class Lights {
    object: THREE.Group;

    constructor(parameters: LightsParameters) {
        for (const [key, value] of Object.entries(parameters)) {
            (this as any)[key] = value;
        }

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the ambient light
        this.object.ambientLight = new THREE.AmbientLight(this.ambientLight.color, this.ambientLight.intensity);
        this.object.add(this.object.ambientLight);

        // Create the first point light and turn on shadows for this light
        this.object.pointLight1 = new THREE.PointLight(this.pointLight1.color, this.pointLight1.intensity, this.pointLight1.distance);
        this.object.pointLight1.position.copy(this.pointLight1.position);
        this.object.pointLight1.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight1.shadow.mapSize.width = 512;
        this.object.pointLight1.shadow.mapSize.height = 512;
        this.object.pointLight1.shadow.camera.near = 5.0;
        this.object.pointLight1.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight1);

        // Create the second point light and turn on shadows for this light
        this.object.pointLight2 = new THREE.PointLight(this.pointLight2.color, this.pointLight2.intensity, this.pointLight2.distance);
        this.object.pointLight2.position.copy(this.pointLight2.position);
        this.object.pointLight2.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight2.shadow.mapSize.width = 512;
        this.object.pointLight2.shadow.mapSize.height = 512;
        this.object.pointLight2.shadow.camera.near = 5.0;
        this.object.pointLight2.shadow.camera.far = 15.0;
        this.object.add(this.object.pointLight2);
    }
}
