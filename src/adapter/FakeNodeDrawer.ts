import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { Color, Vector2D } from '../utils'
export class FakeNodeDrawer implements NodeDrawerInteractor {
    clear (start: Vector2D, size: Vector2D): void {
    }

    draw (start:Vector2D, size:Vector2D, color:Color): void {
    }
}
