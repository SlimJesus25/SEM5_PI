import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default class UserInteraction {
    private gui: GUI;

    constructor(
        private scene: THREE.Scene,
        private renderer: THREE.Renderer,
        private lights: any, // Replace 'any' with proper types for lights
        private fog: any, // Replace 'any' with proper types for fog
        private object: THREE.Object3D,
        private animations: any // Replace 'any' with proper types for animations
    ) {
        this.gui = new GUI({ hideable: false });

        const colorCallback = (object: any, color: string) => {
            object.color.set(color);
        };

        const shadowsCallback = (enabled: boolean) => {
            this.scene.traverseVisible((child: any) => {
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        };

        const createEmoteCallback = (animations: any, name: string) => {
            const callbacks: any = {};
            callbacks[name] = () => {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        };

        const lightsFolder = this.gui.addFolder("Lights");
        // ... (rest of the code remains unchanged for brevity)
        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create point light #1 folder
        const pointLight1Folder = lightsFolder.addFolder("Point light #1");
        const pointLight1 = lights.object.pointLight1;
        const pointColor1 = { color: "#" + new THREE.Color(pointLight1.color).getHexString() };
        pointLight1Folder.addColor(pointColor1, "color").onChange(color => colorCallback(pointLight1, color));
        pointLight1Folder.add(lights.object.pointLight1, "intensity", 0.0, 100.0, 1.0);
        pointLight1Folder.add(lights.object.pointLight1, "distance", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "x", -10.0, 10.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "y", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "z", -10.0, 10.0, 0.01);

        // Create point light #2 folder
        const pointLight2Folder = lightsFolder.addFolder("Point light #2");
        const pointLight2 = lights.object.pointLight2;
        const pointColor2 = { color: "#" + new THREE.Color(pointLight2.color).getHexString() };
        pointLight2Folder.addColor(pointColor2, "color").onChange(color => colorCallback(pointLight2, color));
        pointLight2Folder.add(lights.object.pointLight2, "intensity", 0.0, 100.0, 1.0);
        pointLight2Folder.add(lights.object.pointLight2, "distance", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "x", -10.0, 10.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "y", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "z", -10.0, 10.0, 0.01);

        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(this.fog.color).getHexString() };
        fogFolder.add(this.fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange((color: string) => colorCallback(this.fog.object, color));
        fogFolder.add(this.fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(this.fog.object, "far", 1.01, 20.0, 0.01);

        const characterFolder = this.gui.addFolder("Character");

        const emotesFolder = characterFolder.addFolder("Emotes");
        const callbacks: any[] = [];
        for (let i = 0; i < this.animations.emotes.length; i++) {
            createEmoteCallback(this.animations, this.animations.emotes[i]);
        }

        const expressionsFolder = characterFolder.addFolder("Expressions");
        const face = this.object.getObjectByName("Head_4");
        const expressions = Object.keys(face.morphTargetDictionary);
        for (let i = 0; i < expressions.length; i++) {
            expressionsFolder.add(face.morphTargetInfluences, i, 0.0, 1.0, 0.01).name(expressions[i]);
        }
    }

    setVisibility(visible: boolean): void {
        if (visible) {
            this.gui.show();
        } else {
            this.gui.hide();
        }
    }
}
