import { Grid } from '.'
import { FakeDomInteractor } from '../adapter/FakeDomInteractor'
import { FakeNodeDrawer } from '../adapter/FakeNodeDrawer'
import { CanvasLayer } from '../canvas-layer'
import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { gameSettings, GridSeetings } from '../settings'

export const mockGridFactory = (
    canvasLayer: CanvasLayer = new CanvasLayer(new FakeDomInteractor()),
    nodeDrawerInteractor: NodeDrawerInteractor = new FakeNodeDrawer(),
    gridSettings: GridSeetings = gameSettings.grid
): Grid => new Grid(nodeDrawerInteractor, gridSettings, canvasLayer)
