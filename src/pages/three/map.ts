import {
    // AmbientLight,
    BoxGeometry,
    Color,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    MOUSE,
    PerspectiveCamera,
    PlaneGeometry,
    PointLight,
    RepeatWrapping,
    Scene,
    TextureLoader,
    Vector2,
    Vector3,
    WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import normalMap from '../../assets/home/test_normal.jpg';

class GameMap {
    private camera: PerspectiveCamera;
    public scene: Scene;
    private renderer: WebGLRenderer | undefined;
    private animationList: Array<(time: number) => void> = [];
    private loader = new TextureLoader();
    private controls: OrbitControls | undefined;

    constructor() {
        this.camera = new PerspectiveCamera(70, 1, 0.01, 10000);
        this.camera.position.set(0, 2, 10);
        this.scene = new Scene();
    }

    public init = (dom: HTMLCanvasElement) => {
        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: dom
        });
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight);
        this.renderer.setAnimationLoop(this.animation);
        this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
        const lookAt = new Vector3(0, 1, 0);
        this.camera.lookAt(lookAt);
        this.camera.updateProjectionMatrix();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.mouseButtons = {
            LEFT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
        };
        this.controls.target = lookAt;
        this.controls.update();
    };

    /** 添加灯光 */
    private addLight = () => {
        const pointLight1 = new PointLight(new Color('#ffffff'), 0.3, 17, 0.8);
        pointLight1.position.set(0, 2, 0);
        this.scene.add(pointLight1);

        // const light = new AmbientLight(new Color('#ffffff'));
        // this.scene.add(light);
    };

    /** 添加墙 */
    private addWall = async () => {
        const texture = await this.loader.loadAsync(normalMap);
        texture.rotation = MathUtils.degToRad(90);
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(5, 8);

        const wallMaterial = new MeshPhongMaterial({
            color: new Color('#111111'),
            normalMap: texture,
            normalScale: new Vector2(0.5, 0.5),
            shininess: 200
        });
        const wall = new Mesh(new BoxGeometry(25, 20, 0.5), wallMaterial);
        this.scene.add(wall);
        wall.position.set(0, 10, -10);
    };

    /** 添加镜面反射 */
    private addMirror = () => {
        const mirror = new Reflector(new PlaneGeometry(25, 100));
        mirror.position.z = -25;
        mirror.rotation.x = -Math.PI / 2;
        this.scene.add(mirror);
    };

    /** 添加文字 */
    private addText = async () => {
        const fontLoader = new FontLoader();
        const font = await fontLoader.loadAsync('fonts/helvetiker_regular.typeface.json');
        const textGeometry = new TextGeometry('Hello World', {
            font: font,
            size: 2,
            height: 0.2,
            curveSegments: 120
        });
        const text = new Mesh(textGeometry, new MeshBasicMaterial({ color: '#0093fb' }));
        text.position.x = -7;
        text.position.y = 0.05;
        this.scene.add(text);
    };

    public start = async () => {
        this.addLight();
        this.addWall();
        this.addMirror();
        this.addText();
    };

    private animation = (time: number) => {
        if (this.renderer) {
            this.animationList.forEach((fn) => {
                fn(time);
            });
            (this.controls as OrbitControls).update();
            this.renderer.render(this.scene as Scene, this.camera as PerspectiveCamera);
        }
    };
}

const gameMap = new GameMap();
export default gameMap;
