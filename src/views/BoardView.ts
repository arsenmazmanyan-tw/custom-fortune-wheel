import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import anime from 'animejs';
import { Slice } from './Slice';
import { GENERATED_TEXTURES } from '../configs/Constants';

const SLICE_CONFIG: SliceConfig[] = [
    {
        text: 'I am',
        winnable: true,
        id: 1,
    },
    {
        text: 'the ',
        winnable: false,
        id: 2,
    },
    {
        text: 'Bird',
        winnable: true,
        id: 3,
    },
    {
        text: 'man',
        winnable: false,
        id: 4,
    },
    {
        text: 'MIA',
        winnable: true,
        id: 5,
    },
    {
        text: 'FOR',
        winnable: false,
        id: 6,
    },
    {
        text: 'THE',
        winnable: true,
        id: 7,
    },
    {
        text: 'WIN',
        winnable: false,
        id: 8,
    },
];

const N = SLICE_CONFIG.length;

const RADIUS = 236;

export class BoardView extends Container {
    private arrow: Sprite;
    private ornament: Sprite;
    private wheelContainer: Container;
    private spinButton: Sprite;
    private canSpin = true;
    private slices: Slice[] = [];

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.wheelContainer = new Container();
        this.addChild(this.wheelContainer);
        this.buildOrnament();
        this.generateSliceTexture();
        this.buildSlices();
    }

    private generateSliceTexture(): void {
        const semicircle = new Graphics();
        semicircle.beginFill(0xffffff);
        semicircle.lineStyle(0, 0xffffff);
        semicircle.arc(0, 0, RADIUS, -Math.PI / 2 - Math.PI / N, -Math.PI / (N / 2) - Math.PI / N);
        semicircle.lineTo(0, 0);
        semicircle.closePath();
        GENERATED_TEXTURES.sliceTexture = window.game.renderer.generateTexture(semicircle);
        semicircle.destroy();
    }

    private buildSlices(): void {
        SLICE_CONFIG.forEach((s, i) => {
            const slice = new Slice(s, i);
            slice.rotation = i * ((Math.PI / N) * 2);
            this.wheelContainer.addChild(slice);
        });
    }

    private buildOrnament(): void {
        this.ornament = Sprite.from('ornament.png');
        this.ornament.anchor.set(0.5);
        this.ornament.eventMode = 'static';
        this.ornament.on('pointerup', this.onSpinClick, this);
        this.addChild(this.ornament);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from('spin_button.png');
        this.spinButton.anchor.set(0.5);
        this.spinButton.eventMode = 'static';
        this.spinButton.on('pointerup', this.onSpinClick, this);
        this.addChild(this.spinButton);
    }

    private onSpinClick(): void {
        if (!this.canSpin) return;
        this.canSpin = false;
        // const angle = getSpinResult();
        anime({
            targets: this.wheelContainer,
            angle: 360 * 4,
            duration: 5000,
            easing: 'easeInOutCirc',
            complete: () => {
                // this.wheel.angle = angle;
                this.canSpin = true;
            },
        });
    }
}
