import { IComponent, Vector2D } from '..'
import { Entity } from '../ecs'

export abstract class OnClickComponent implements IComponent {
    public abstract Entity: Entity | null ;
    public abstract Awake(): void
    public abstract Update(deltaTime: number): void
    public abstract ClickOn(point: Vector2D): void
}
