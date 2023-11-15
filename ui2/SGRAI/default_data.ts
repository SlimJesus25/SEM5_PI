import * as THREE from "three";
import Orientation from "./orientation.js";

export const generalData = {
    setDevicePixelRatio: false
};

export const mazeData = {
    url: "./mazes/Loquitas.json",
    credits: "Maze designed by Cecília Fernandes and Nikita.",
    scale: new THREE.Vector3(1.0, 1.0, 1.0)
};

export const playerData = {
    url: "./models/gltf/RobotExpressive/RobotExpressive.glb",
    credits: `Model and related code snippets created by <a href='https://www.patreon.com/quaternius' target='_blank' rel='noopener'>Tomás Laulhé</a>. CC0 1.0. Modified by <a href='https://donmccurdy.com/' target='_blank' rel='noopener'>Don McCurdy</a>.`,
    eyeHeight: 0.8,
    scale: new THREE.Vector3(0.1, 0.1, 0.1),
    walkingSpeed: 0.75,
    initialDirection: 0.0,
    turningSpeed: 75.0,
    runningFactor: 2.0,
    keyCodes: {
        fixedView: "Digit1",
        firstPersonView: "Digit2",
        thirdPersonView: "Digit3",
        topView: "Digit4",
        viewMode: "KeyV",
        userInterface: "KeyU",
        miniMap: "KeyM",
        help: "KeyH",
        statistics: "KeyS",
        run: "KeyR",
        left: "ArrowLeft",
        right: "ArrowRight",
        backward: "ArrowDown",
        forward: "ArrowUp",
        jump: "KeyJ",
        yes: "KeyY",
        no: "KeyN",
        wave: "KeyW",
        punch: "KeyP",
        thumbsUp: "KeyT"
    }
};

export const lightsData = {
    ambientLight: { color: 0xffffff, intensity: 1.0 },
    pointLight1: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    pointLight2: { color: 0xffffff, intensity: 1.0, distance: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0) },
    spotLight: { color: 0xffffff, intensity: 1.0, distance: 0.0, angle: Math.PI / 3.0, penumbra: 0.0, position: new THREE.Vector3(0.0, 0.0, 0.0), direction: 0.0 }
};

export const fogData = {
    enabled: false,
    color: 0xe0e0e0,
    near: 0.1,
    far: 14.0
};

export const cameraData = {
    view: "fixed",
    multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 1.0, 1.0),
    target: new THREE.Vector3(0.0, 0.0, 0.0),
    initialOrientation: new Orientation(135.0, -45.0),
    orientationMin: new Orientation(-180.0, -90.0),
    orientationMax: new Orientation(180.0, 0.0),
    initialDistance: 8.0,
    distanceMin: 4.0,
    distanceMax: 16.0,
    initialZoom: 1.0,
    zoomMin: 0.5,
    zoomMax: 2.0,
    initialFov: 45.0,
    near: 0.01,
    far: 100.0
};
