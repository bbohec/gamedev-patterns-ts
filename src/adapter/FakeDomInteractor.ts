import { DomInteractor } from '../port/domInteractor'
import { Color, Vector2D } from '../utils'

export class FakeDomInteractor implements DomInteractor {
    constructor (canvasRect = { top: 0, left: 0, width: 0, height: 0 }) {
        this.canvasRect = canvasRect
    }

    getCanvasRect (): { top: number; left: number; width: number; height: number } {
        return this.canvasRect
    }

    getScroll (): { top: number; left: number } {
        return { top: 0, left: 0 }
    }

    setLayerOrder (order: number): void {
    }

    fillCircle (center: Vector2D, radius: number, color: Color): void {
    }

    clearRect (start:Vector2D, size:Vector2D) {
    }

    fillRect (start:Vector2D, size:Vector2D, color:Color): void {

    }

    createCanvas (size:Vector2D) {

    }

    private canvasRect:{ top: number, left: number, width:number, height: number}
}
