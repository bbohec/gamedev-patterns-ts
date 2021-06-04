import { CanvasLayer } from '../canvas-layer'
import { Fleet } from '../fleet'
import { Grid } from '../grid'
import { GameDependencies } from '../port/gameDependencies'
import { Entity } from '../utils/ecs'
import { GameInputComponent } from './components'
export class Game extends Entity {
    constructor (
        grid:Grid, fleetA:Fleet, fleetB:Fleet,
        private canvasLayer:CanvasLayer,
        private gameDependencies:GameDependencies
    ) {
        super()
        this._entities.push(
            grid,
            fleetA,
            fleetB
        )
    }

    public Awake ():void {
        this.AddComponent(new GameInputComponent(this.gameDependencies.eventInteractor, this.canvasLayer))
        super.Awake()
        for (const entity of this.Entities) entity.Awake()
        this.gameDependencies.loopManagerInteractor.executeNextLoop((timestamp) => {
            this._lastTimestamp = timestamp
            this.Update(timestamp)
        })
    }

    public Update (timestamp:number): void {
        const deltaTime = (timestamp - this._lastTimestamp) / 1000
        super.Update(deltaTime)
        for (const entity of this.Entities) {
            entity.Update(deltaTime)
        }
        this._lastTimestamp = timestamp
        this.gameDependencies.loopManagerInteractor.executeNextLoop((timestamp) => this.Update(timestamp))
    }

    public get Entities (): Entity[] {
        return this._entities
    }

    private _entities: Entity[] = []
    private _lastTimestamp = 0
}
