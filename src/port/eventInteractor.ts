import { Vector2D } from '../utils'

export interface EventInteractor {
    onClick(callback: (mousePosition: Vector2D) => void):void;
}
