import { EventInteractor } from '../port/eventInteractor'
import { Vector2D } from '../utils'

export class ClientEventInteractor implements EventInteractor {
    onClick (callback: (mousePosition: Vector2D) => void): void {
        document.body.addEventListener('click', (mouseEvent: MouseEvent) => {
            callback(new Vector2D(mouseEvent.x, mouseEvent.y))
        })
    }
}
