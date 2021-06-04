import { CanvasLayer } from '../canvas-layer'
import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { Color, Vector2D } from '../utils'
export class ClientNodeDrawer implements NodeDrawerInteractor {
    // eslint-disable-next-line no-useless-constructor
    constructor (private canvasLayer:CanvasLayer) {}
    clear (start:Vector2D, size:Vector2D): void {
        this.canvasLayer.Background.ClearRect(start, size)
    }

    draw (start:Vector2D, size:Vector2D, color:Color): void {
        this.canvasLayer.Background.FillRect(start, size, color)
    }
}
