
import { Ship } from '.'
import { FakeShipDrawer } from '../adapter/FakeShipDrawer'
import { mockFleetFactory } from '../fleet'
import { mockNodeFactory } from '../node'
import { ShipDrawerInteractor } from '../port/shipDrawerInteractor'
import { GameSettings, gameSettings as defaultGameSettings } from '../settings'
export const mockShipFactory = (
    fleet = mockFleetFactory(), node = mockNodeFactory(),
    gameSettings:GameSettings = defaultGameSettings,
    shipsDrawer:ShipDrawerInteractor = new FakeShipDrawer()
): Ship => new Ship(fleet, node, gameSettings.ships, gameSettings.grid, shipsDrawer)
