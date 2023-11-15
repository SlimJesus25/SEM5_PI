import * as THREE from "three";

interface GroundParameters {
    textureUrl: string;
    size: THREE.Vector2;
}

export default class Ground {
    public object: THREE.Mesh;
    private textureUrl: string;
    private size: THREE.Vector2;

    constructor(parameters: GroundParameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(this.size.x, this.size.y);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a ground plane that receives shadows but does not cast them
        const geometry = new THREE.PlaneGeometry(this.size.x, this.size.y);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotateX(-Math.PI / 2.0);
        this.object.castShadow = false;
        this.object.receiveShadow = true;
    }
}
