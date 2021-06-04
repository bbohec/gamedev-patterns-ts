import { NodeDrawerInteractor } from '../../../port/nodeDrawerInteractor'
import { gameSettings } from '../../../settings'
import { IComponent, Vector2D } from '../../../utils'
import { Node } from '../../node'

export class NodeDrawComponent implements IComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor (
        private start:Vector2D,
        private size:Vector2D,
        private nodeDrawer:NodeDrawerInteractor
    ) {
    }

    public Entity: Node | null = null;

    public Awake (): void {
        this.nodeDrawer.clear(this.start, this.size)
    }

    public Update (deltaTime: number): void {
        if (!this.Entity) throw new Error('Entity is null!')
        this.nodeDrawer.clear(this.start, this.size)
        this.nodeDrawer.draw(this.start, this.size, this.Entity.IsActive ? gameSettings.grid.color.active : gameSettings.grid.color.regular)
    }
}
