import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { GENERATED_TEXTURES } from '../configs/Constants';

export class Slice extends Container {
    private bkg: Sprite;
    private text: Text;

    constructor(private config: SliceConfig, private i: number) {
        super();

        this.build();
    }

    get isWinnable(): boolean {
        return this.config.winnable;
    }

    get id(): number {
        return this.config.id;
    }

    private build(): void {
        this.buildBkg();
        this.buildText();
    }

    private buildBkg(): void {
        this.bkg = Sprite.from(GENERATED_TEXTURES.sliceTexture);

        this.bkg.anchor.set(0.5, 1);
        this.bkg.tint = this.i % 2 === 0 ? 0xbd48bd : 0x3e73b3;
        this.addChild(this.bkg);

        const gr = new Graphics();
        gr.beginFill(0xff0000, 1);
        gr.drawCircle(this.bkg.x, this.bkg.y, 12);
        gr.endFill();
        this.addChild(gr);
    }

    private buildText(): void {
        this.text = new Text(this.config.text);
        this.text.position.set(0, -this.bkg.height / 2 - 30);
        this.text.anchor.set(0.5);
        this.addChild(this.text);
    }
}
