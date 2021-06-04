import { Entity } from '../utils'
import { Team } from '../team'
import { Ship } from '../ship'
import { GridSeetings, ShipsSettings } from '../settings'
import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { Grid } from '../grid'
export class Fleet extends Entity {
    constructor (
        public readonly Team: Team,
        private readonly _grid: Grid,
        private shipsSettings:ShipsSettings,
        private gridSettings:GridSeetings,
        private shipDrawer:ShipDrawerInteractor
    ) {
        super()
    }

    public Awake (): void {
        super.Awake()
        this.PrepareShips()
    }

    public Update (deltaTime: number): void {
        super.Update(deltaTime)
        this._ships.map(ship => ship.Update(deltaTime))
    }

    private PrepareShips (): void {
        const dimension = this.gridSettings.dimension
        const fleetSize = this.shipsSettings.fleetSize
        const nodes = this._grid.Nodes
        for (let shipNumber = 0; shipNumber < fleetSize; shipNumber++) {
            const node = this.Team === Team.A ? nodes[shipNumber * dimension] : nodes[nodes.length - 1 - shipNumber * dimension]
            const ship = new Ship(this, node, this.shipsSettings, this.gridSettings, this.shipDrawer)
            this._ships.push(ship)
            ship.Awake()
        }
    }

    private _ships: Ship[] = []
}
