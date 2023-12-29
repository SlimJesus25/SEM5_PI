import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { GUI } from "dat.gui";

/*
 * parameters = {
 *  frontTextureUrl: String,
 *  backTextureUrl: string
 * }
 */

export default class Door {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        const textureFront = new THREE.TextureLoader().load(this.frontTextureUrl);
        textureFront.colorSpace = THREE.SRGBColorSpace;
        textureFront.magFilter = THREE.LinearFilter;
        textureFront.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a texture
        const textureBack = new THREE.TextureLoader().load(this.backTextureUrl);
        textureBack.colorSpace = THREE.SRGBColorSpace;
        textureBack.magFilter = THREE.LinearFilter;
        textureBack.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a wall (seven faces) that casts and receives shadows

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the front face (a rectangle)
        let geometryFront = new THREE.PlaneGeometry(0.95, 1.0);
        let materialFront = new THREE.MeshPhongMaterial({ color: 0xffffff, map: textureFront });
        let faceFront = new THREE.Mesh(geometryFront, materialFront);
        faceFront.position.set(0.0, 0.0, 0.025);
        faceFront.castShadow = true;
        faceFront.receiveShadow = true;
        this.object.add(faceFront);

        // Create the rear face (a rectangle)
        let geometry = new THREE.PlaneGeometry(0.95, 1.0);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: textureBack });
        let face = new THREE.Mesh(geometry, material);
        face.rotateY(Math.PI);
        face.position.set(0.0, 0.0, -0.025);
        this.object.add(face);

        // Create the two left faces (a four-triangle mesh)
        let points = new Float32Array([
            -0.475, -0.5, 0.025,
            -0.475, 0.5, 0.025,
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,

            -0.5, 0.5, 0.0,
            -0.475, 0.5, -0.025,
            -0.475, -0.5, -0.025,
            -0.5, -0.5, 0.0
        ]);
        let normals = new Float32Array([
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,

            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707
        ]);
        let indices = [
            0, 1, 2,
            2, 3, 0,
            4, 5, 6,
            6, 7, 4
        ];
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        material = new THREE.MeshPhongMaterial({ color: 0x6b554b });
        face = new THREE.Mesh(geometry, material);
        face.castShadow = true;
        face.receiveShadow = true;
        this.object.add(face);

        // Create the two right faces (a four-triangle mesh)
        face = new THREE.Mesh().copy(face, false);
        face.rotateY(Math.PI);
        this.object.add(face);

        // Create the top face (a four-triangle mesh)
        points = new Float32Array([
            -0.5, 0.5, 0.0,
            -0.475, 0.5, 0.025,
            -0.475, 0.5, -0.025,
            0.475, 0.5, 0.025,
            0.475, 0.5, -0.025,
            0.5, 0.5, 0.0
        ]);
        normals = new Float32Array([
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ]);
        indices = [
            0, 1, 2,
            2, 1, 3,
            3, 4, 2,
            4, 3, 5
        ];
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        face = new THREE.Mesh(geometry, material);
        face.castShadow = true;
        face.receiveShadow = true;
        this.object.add(face);

        this.state = "close";
        this.tween = new TWEEN.Tween(this.object.rotation); // Assuming you want to animate the rotation of the door
    }

    createGUI() {
        this.gui = new GUI();
        this.actions = {
            open: () => {
                if (this.state != "open") {
                    this.state = "open";
                    this.tween.stop();
                    this.tween.to({ y: Math.PI / 2.0 }, 2000 * (1.0 - this.object.rotation.y / (Math.PI / 2.0)));
                    this.tween.startFromCurrentValues();
                    console.log("Open");
                }
            },
            stop: () => {
                this.state = "stop";
                this.tween.stop();
            },
            close: () => {
                if (this.state != "close") {
                    this.state = "close";
                    this.tween.stop();
                    this.tween.to({ y: 0.0 }, 2000 * this.object.rotation.y / (Math.PI / 2.0));
                    this.tween.startFromCurrentValues();
                }
            }
        };
        this.gui.add(this.actions, "open");
        this.gui.add(this.actions, "stop");
        this.gui.add(this.actions, "close");
    }
}


