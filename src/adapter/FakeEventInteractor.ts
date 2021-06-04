import { EventInteractor } from '../port/eventInteractor'
import { Vector2D } from '../utils'

export class FakeEventInteractor implements EventInteractor {
    onClick (callback: (mousePosition: Vector2D) => void): void {
        callback(new Vector2D(0, 0))
    }
}
