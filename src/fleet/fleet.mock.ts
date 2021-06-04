import { Fleet } from '.'
import { FakeDomInteractor } from '../adapter/FakeDomInteractor'
import { FakeNodeDrawer } from '../adapter/FakeNodeDrawer'
import { FakeShipDrawer } from '../adapter/FakeShipDrawer'
import { CanvasLayer } from '../canvas-layer'
import { Grid } from '../grid'
import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { gameSettings } from '../settings'
import { Team } from '../team'
export const mockFleetFactory = (
    team = Team.A,
    grid:Grid = new Grid(new FakeNodeDrawer(), gameSettings.grid, new CanvasLayer(new FakeDomInteractor())),
    shipDrawer:ShipDrawerInteractor = new FakeShipDrawer()
): Fleet => new Fleet(team, grid, gameSettings.ships, gameSettings.grid, shipDrawer)
