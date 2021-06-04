import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { Entity, Vector2D } from '../utils'
import { NodeDrawComponent } from './components'

export class Node extends Entity {
    constructor (
        public readonly Start: Vector2D,
        public readonly End: Vector2D,
        public readonly Index: Vector2D,
        private nodeDrawerInteractor:NodeDrawerInteractor
    ) {
        super()
    }

    public Awake (): void {
        this.AddComponent(new NodeDrawComponent(this.Start, this.Size, this.nodeDrawerInteractor))
        super.Awake()
    }

    public get Size (): Vector2D {
        return new Vector2D(
            this.End.x - this.Start.x,
            this.End.y - this.Start.y
        )
    }

    public get Center (): Vector2D {
        return new Vector2D(
            this.Start.x + this.Size.x / 2,
            this.Start.y + this.Size.y / 2
        )
    }

    public Occupies (point: Vector2D): boolean {
        return !((point.x < this.Start.x ||
            point.x > this.End.x ||
            point.y < this.Start.y ||
            point.y > this.End.y))
    }

    public IsActive = false
}
