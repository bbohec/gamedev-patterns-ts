import { ShipDrawComponent, ShipLocomotionComponent } from '.'
import { Fleet } from '../fleet'
import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { GridSeetings, ShipsSettings } from '../settings'
import { Entity, Vector2D } from '../utils'
import { Node } from '../node'

export class Ship extends Entity {
    constructor (
        public readonly Factory: Fleet,
        node:Node,
        private shipSettings:ShipsSettings,
        private gridSettings:GridSeetings,
        private shipDrawer:ShipDrawerInteractor
    ) {
        super()
        this._locomotionComponent = new ShipLocomotionComponent()
        this._locomotionComponent.Node = node
    }

    public Awake (): void {
        this.AddComponent(new ShipDrawComponent(this.shipSettings, this.gridSettings, this.shipDrawer))
        this.AddComponent(this._locomotionComponent)
        super.Awake()
    }

    public get Position (): Vector2D | null {
        return this._locomotionComponent.Position
    }

    private readonly _locomotionComponent: ShipLocomotionComponent
}
