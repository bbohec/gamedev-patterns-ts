import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { ShipDrawComponent } from '.'
import { mockShipFactory } from '../..'
import { FakeDomInteractor } from '../../../adapter/FakeDomInteractor'
import { gameSettings } from '../../../settings'
import { ClientShipDrawer } from '../../../adapter/ClientShipDrawer'
import { CanvasLayer } from '../../../canvas-layer'
chai.use(spies)
const expect = chai.expect
describe('>>> Node Ship Component', () => {
    let comp: ShipDrawComponent
    beforeEach(() => {
        comp = new ShipDrawComponent(gameSettings.ships, gameSettings.grid, new ClientShipDrawer(new CanvasLayer(new FakeDomInteractor())))
        comp.Entity = mockShipFactory()
    })
    it('should cleanup when awakens', () => {
        const spy = chai.spy.on(FakeDomInteractor.prototype, 'clearRect')
        expect(spy).not.to.be.called()
        comp.Awake()
        expect(spy).to.be.called()
        chai.spy.restore(FakeDomInteractor.prototype, 'clearRect')
    })
    it('should cleanup and draw rect every frame', () => {
        const spyClearRect = chai.spy.on(FakeDomInteractor.prototype, 'clearRect')
        const spyFillRect = chai.spy.on(FakeDomInteractor.prototype, 'fillCircle')
        expect(spyClearRect).not.to.be.called()
        expect(spyFillRect).not.to.be.called()
        comp.Update(0)
        expect(spyClearRect).to.be.called()
        expect(spyFillRect).to.be.called()
    })
})
