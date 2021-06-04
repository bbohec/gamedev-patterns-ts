import { Grid } from '../..'
import { Vector2D, OnClickComponent } from '../../../utils'

export class GridOnclickComponent extends OnClickComponent {
    public Entity: Grid|null=null

    public Awake (): void {
        // @todo
    }

    public Update (deltaTime: number): void {
        // @todo
    }

    public ClickOn (point: Vector2D): void {
        if (!this.Entity) throw new Error('Entity null')
        for (const node of this.Entity.Nodes) {
            node.IsActive = node.Occupies(point)
        }
    }
}
