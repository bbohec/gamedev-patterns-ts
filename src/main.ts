import { ClientDomInteractor } from './adapter/ClientDomInteractor'
import { ClientEventInteractor } from './adapter/ClientEventInteractor'
import { ClientLoopManager } from './adapter/ClientLoopManager'
import { ClientNodeDrawer } from './adapter/ClientNodeDrawer'
import { ClientShipDrawer } from './adapter/ClientShipDrawer'
import { CanvasLayer } from './canvas-layer'
import { Fleet } from './fleet'
import { Game } from './game'
import { Grid } from './grid'
import { GameDependencies } from './port/gameDependencies'
import { gameSettings } from './settings'
import { Team } from './team'
const clientDomInteractor = new ClientDomInteractor()
const canvasLayer = new CanvasLayer(clientDomInteractor)
const gameDependencies:GameDependencies = {
    loopManagerInteractor: new ClientLoopManager(),
    eventInteractor: new ClientEventInteractor(),
    shipDrawerInteractor: new ClientShipDrawer(canvasLayer),
    nodeDrawerInteractor: new ClientNodeDrawer(canvasLayer)
}
const grid = new Grid(gameDependencies.nodeDrawerInteractor, gameSettings.grid, canvasLayer)
const fleetA = new Fleet(Team.A, grid, gameSettings.ships, gameSettings.grid, gameDependencies.shipDrawerInteractor)
const fleetB = new Fleet(Team.B, grid, gameSettings.ships, gameSettings.grid, gameDependencies.shipDrawerInteractor)
new Game(grid, fleetA, fleetB, canvasLayer, gameDependencies).Awake()
