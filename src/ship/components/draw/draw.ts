import { Ship } from '../..'
import { ShipDrawerInteractor } from '../../../port/shipDrawerInteractor'
import { GridSeetings, ShipsSettings } from '../../../settings'
import { Team } from '../../../team'
import { IComponent, Vector2D } from '../../../utils'

export class ShipDrawComponent implements IComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor (private shipsSettings:ShipsSettings, private gridSettings:GridSeetings, private interactWithShipDrawer:ShipDrawerInteractor) {}
    public Entity: Ship|null = null

    public Awake (): void {
        this.Clear()
    }

    public Update (deltaTime: number): void {
        this.Clear()
        this.Draw()
    }

    private get Position (): Vector2D {
        const position = this.Entity?.Position
        if (!position) throw new Error('Attempt to draw a ship that has no Position')
        return position
    }

    private Draw (): void {
        const colors = this.shipsSettings.colors
        if (this.Entity === null) throw new Error('Entity is null.')
        const color = this.Entity.Factory.Team === Team.A ? colors.a : colors.b
        this.interactWithShipDrawer.draw(this.Position, this.shipsSettings.radius, color)
    }

    private Clear (): void {
        this.interactWithShipDrawer.clear(
            new Vector2D(this.Position.x - this.gridSettings.nodeSize / 2, this.Position.y - this.gridSettings.nodeSize / 2),
            new Vector2D(this.gridSettings.nodeSize, this.gridSettings.nodeSize)
        )
    }
}
