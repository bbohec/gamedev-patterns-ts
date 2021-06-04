import { Color, Vector2D } from '../utils'
export interface NodeDrawerInteractor {
    draw(start:Vector2D, size:Vector2D, color:Color):void
    clear(start:Vector2D, size:Vector2D):void
}
