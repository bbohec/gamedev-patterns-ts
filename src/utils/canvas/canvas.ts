import { Color, Vector2D } from '..'
import { DomInteractor } from '../../port/domInteractor'

export class Canvas {
    // eslint-disable-next-line no-useless-constructor
    constructor (
        public readonly Size: Vector2D,
        private interactWithDom:DomInteractor
    ) { }

    public Awake (): void {
        this.createCanvas()
    }

    private createCanvas ():void {
        this.interactWithDom.createCanvas(this.Size)
    }

    public FillRect (start: Vector2D, size: Vector2D, color: Color): void {
        this.interactWithDom.fillRect(start, size, color)
    }

    public FillCircle (center: Vector2D, radius: number, color: Color): void {
        this.interactWithDom.fillCircle(center, radius, color)
    }

    public ClearRect (start: Vector2D, size: Vector2D): void {
        this.interactWithDom.clearRect(start, size)
    }

    public setLayerOrder (order: number): void {
        this.interactWithDom.setLayerOrder(order)
    }

    public CalcLocalPointFrom (globalPoint: Vector2D): Vector2D | null {
        const offset = {
            top: this.interactWithDom.getCanvasRect().top + this.interactWithDom.getScroll().top,
            left: this.interactWithDom.getCanvasRect().left + this.interactWithDom.getScroll().left
        }
        const x = globalPoint.x - offset.left
        const y = globalPoint.y - offset.top
        if (x < 0 || y < 0) return null
        if (x > offset.left + this.interactWithDom.getCanvasRect().width || y > offset.top + this.interactWithDom.getCanvasRect().height) return null
        return new Vector2D(x, y)
    }
}
