import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { Color, Vector2D } from '../utils'
export class FakeShipDrawer implements ShipDrawerInteractor {
    clear (start: Vector2D, size: Vector2D): void {}

    draw (position:Vector2D, radius:number, shipColor:Color): void {}
}
