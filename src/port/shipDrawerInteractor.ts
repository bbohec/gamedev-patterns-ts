import { Color, Vector2D } from '../utils'
export interface ShipDrawerInteractor {
    draw(position:Vector2D, radius:number, shipColor:Color): void
    clear(start:Vector2D, size:Vector2D):void
}
