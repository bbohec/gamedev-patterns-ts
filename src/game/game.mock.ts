import { Game } from '.'
import { FakeDomInteractor } from '../adapter/FakeDomInteractor'
import { FakeEventInteractor } from '../adapter/FakeEventInteractor'
import { FakeLoopManager } from '../adapter/FakeLoopManager'
import { FakeNodeDrawer } from '../adapter/FakeNodeDrawer'
import { FakeShipDrawer } from '../adapter/FakeShipDrawer'
import { CanvasLayer } from '../canvas-layer'
import { mockFleetFactory } from '../fleet'
import { Grid } from '../grid'
import { mockGridFactory } from '../grid/grid.mock'
import { GameDependencies } from '../port/gameDependencies'
import { Team } from '../team'

const fakeGameDependencies:GameDependencies = {
    loopManagerInteractor: new FakeLoopManager(1),
    eventInteractor: new FakeEventInteractor(),
    nodeDrawerInteractor: new FakeNodeDrawer(),
    shipDrawerInteractor: new FakeShipDrawer()
}
const fakeCanvasLayer = new CanvasLayer(new FakeDomInteractor())
export const mockGameFactory = (
    grid: Grid = mockGridFactory(fakeCanvasLayer),
    fleetA = mockFleetFactory(Team.A, grid, fakeGameDependencies.shipDrawerInteractor),
    fleetB = mockFleetFactory(Team.B, grid, fakeGameDependencies.shipDrawerInteractor),
    canvasLayer: CanvasLayer = fakeCanvasLayer,
    gameDependencies: GameDependencies = fakeGameDependencies
): Game => new Game(grid, fleetA, fleetB, canvasLayer, gameDependencies)
