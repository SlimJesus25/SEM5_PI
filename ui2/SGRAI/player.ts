import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface PlayerParameters {
    url: string;
    credits: string;
    scale: THREE.Vector3;
    walkingSpeed: number;
    initialDirection: number;
    turningSpeed: number;
    runningFactor: number;
    keyCodes: {
        fixedView: string;
        firstPersonView: string;
        thirdPersonView: string;
        topView: string;
        viewMode: string;
        userInterface: string;
        miniMap: string;
        help: string;
        statistics: string;
        run: string;
        left: string;
        right: string;
        backward: string;
        forward: string;
        jump: string;
        yes: string;
        no: string;
        wave: string;
        punch: string;
        thumbsUp: string;
    };
}

export default class Player {
    public object: THREE.Object3D;
    public animations: THREE.AnimationClip[];
    private scale: THREE.Vector3;
    private initialDirection: number;
    private keyStates: Record<string, boolean>;
    private radius: number;
    private eyeHeight: number;
    private url: string;
    private loaded: boolean;

    constructor(parameters: PlayerParameters) {
        this.onLoad = (description: { scene: THREE.Object3D; animations: THREE.AnimationClip[] }) => {
            this.object = description.scene;
            this.animations = description.animations;

            // Turn on shadows for this object
            this.setShadow(this.object);

            // Get the object's axis-aligned bounding box (AABB) in 3D space
            const box = new THREE.Box3();
            box.setFromObject(this.object);

            // Compute the object size
            const size = new THREE.Vector3();
            box.getSize(size);

            // Adjust the object's oversized dimensions (hard-coded; see previous comments)
            size.x = 3.0;
            size.y = 4.4;
            size.z = 2.6;

            // Set the object's radius and eye height
            this.radius = size.x / 2.0 * this.scale.x;
            this.eyeHeight *= size.y * this.scale.y;

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        };

        this.onProgress = (url: string, xhr: ProgressEvent<EventTarget>) => {
            console.log(`Resource '${url}' ${(100.0 * xhr.loaded / xhr.total).toFixed(0)}% loaded.`);
        };

        this.onError = (url: string, error: ErrorEvent) => {
            console.error(`Error loading resource ${url} (${error}).`);
        };

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.initialDirection = THREE.MathUtils.degToRad(this.initialDirection);
        this.keyStates = {
            fixedView: false, firstPersonView: false, thirdPersonView: false, topView: false, viewMode: false,
            miniMap: false, statistics: false, userInterface: false, help: false, run: false, left: false, right: false,
            backward: false, forward: false, jump: false, yes: false, no: false, wave: false, punch: false, thumbsUp: false
        };
        this.loaded = false;

        // Create a resource .gltf or .glb file loader
        const loader = new GLTFLoader();

        // Load a model description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            (description) => this.onLoad(description),

            // onProgress callback
            (xhr) => this.onProgress(this.url, xhr),

            // onError callback
            (error) => this.onError(this.url, error)
        );
    }

    private setShadow(object: THREE.Object3D) {
        object.traverse((child) => { // Modifying the scene graph inside the callback is discouraged
            if (child instanceof THREE.Object3D) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        });
    }
}
