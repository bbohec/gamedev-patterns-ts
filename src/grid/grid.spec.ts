import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { gameSettings } from '../settings'
import { Grid } from '.'
import { FakeNodeDrawer } from '../adapter/FakeNodeDrawer'
import { Node } from '../node'
import { CanvasLayer } from '../canvas-layer'
import { FakeDomInteractor } from '../adapter/FakeDomInteractor'
chai.use(spies)
const expect = chai.expect
describe('>>> Grid', () => {
    const nodeCount = gameSettings.grid.dimension * gameSettings.grid.dimension
    let grid: Grid

    beforeEach(() => {
        grid = new Grid(new FakeNodeDrawer(), gameSettings.grid, new CanvasLayer(new FakeDomInteractor()))
    })

    it('should awake and update all children', () => {
        const spyNodeAwake = chai.spy.on(Node.prototype, 'Awake')
        const spyNodeUpdate = chai.spy.on(Node.prototype, 'Update')

        expect(spyNodeAwake).not.to.be.called()
        expect(spyNodeUpdate).not.to.be.called()

        grid.Awake()
        expect(spyNodeAwake).to.be.called.exactly(nodeCount)

        grid.Update(0)
        expect(spyNodeUpdate).to.be.called.exactly(nodeCount)
    })
})
