import { EventInteractor } from './eventInteractor'
import { NodeDrawerInteractor } from './nodeDrawerInteractor'
import { ShipDrawerInteractor } from './shipDrawerInteractor'
import { LoopManagerInteractor } from './timeManagerInteractor'
export interface GameDependencies {
    loopManagerInteractor:LoopManagerInteractor
    nodeDrawerInteractor:NodeDrawerInteractor
    shipDrawerInteractor:ShipDrawerInteractor
    eventInteractor:EventInteractor
}
