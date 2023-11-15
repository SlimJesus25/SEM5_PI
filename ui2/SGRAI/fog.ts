import * as THREE from "three";

interface FogParameters {
    enabled: boolean;
    color: number;
    near: number;
    far: number;
}

export default class Fog {
    enabled: boolean;
    color: number;
    near: number;
    far: number;
    object: THREE.Fog;

    constructor(parameters: FogParameters) {
        for (const [key, value] of Object.entries(parameters)) {
            (this as any)[key] = value;
        }

        // Create the fog
        this.object = new THREE.Fog(this.color, this.near, this.far);
    }
}
