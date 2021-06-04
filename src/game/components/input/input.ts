import { Game } from '../..'
import { CanvasLayer } from '../../../canvas-layer'
import { EventInteractor } from '../../../port/eventInteractor'
import { IComponent, Vector2D, OnClickComponent } from '../../../utils'
export class GameInputComponent implements IComponent {
    constructor (eventInteractor:EventInteractor, canvasLayer:CanvasLayer) {
        this.eventInteractor = eventInteractor
        this.canvasLayer = canvasLayer
    }

    Entity: Game | null = null;
    Awake (): void {
        this.eventInteractor.onClick(mousePosition => this.HandleClick(mousePosition))
    }

    Update (deltaTime: number): void {

    }

    private HandleClick (mousePosition: Vector2D): void {
        const point = this.canvasLayer.Background.CalcLocalPointFrom(mousePosition)
        if (!point) return
        if (!this.Entity) throw new Error('Entity is null!!')
        for (const entity of this.Entity.Entities) {
            if (!entity.HasComponent(OnClickComponent)) continue
            entity.GetComponent(OnClickComponent).ClickOn(point)
        }
    }

    private eventInteractor: EventInteractor;
    private canvasLayer:CanvasLayer;
}
