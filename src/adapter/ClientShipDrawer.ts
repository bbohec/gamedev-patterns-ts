import { CanvasLayer } from '../canvas-layer'
import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { Color, Vector2D } from '../utils'
export class ClientShipDrawer implements ShipDrawerInteractor {
    // eslint-disable-next-line no-useless-constructor
    constructor (private canvasLayer:CanvasLayer) {}
    clear (start: Vector2D, size: Vector2D): void {
        this.canvasLayer.Foreground.ClearRect(start, size)
    }

    draw (position:Vector2D, radius:number, shipColor:Color): void {
        this.canvasLayer.Foreground.FillCircle(position, radius, shipColor)
    }
}
