import { NodeDrawComponent } from '.'
import { Vector2D } from '../../../utils'
import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { mockNodeFactory } from '../../node.mock'
import { ClientNodeDrawer } from '../../../adapter/ClientNodeDrawer'
import { CanvasLayer } from '../../../canvas-layer'
import { FakeDomInteractor } from '../../../adapter/FakeDomInteractor'
import { gameSettings } from '../../../settings'
chai.use(spies)
const expect = chai.expect

describe('>>> Node Draw Component', () => {
    let comp: NodeDrawComponent
    beforeEach(() => {
        comp = new NodeDrawComponent(new Vector2D(0, 0), new Vector2D(1, 1), new ClientNodeDrawer(new CanvasLayer(new FakeDomInteractor())))
        comp.Entity = mockNodeFactory()
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
        const spyFillRect = chai.spy.on(FakeDomInteractor.prototype, 'fillRect')
        expect(spyClearRect).not.to.be.called()
        expect(spyFillRect).not.to.be.called()
        comp.Update(0)
        expect(spyClearRect).to.be.called()
        expect(spyFillRect).to.be.called()
        chai.spy.restore(FakeDomInteractor.prototype, 'clearRect')
        chai.spy.restore(FakeDomInteractor.prototype, 'fillRect')
    })
    it('should render active color if entity is active and regular color otherwise', () => {
        const spyFillRect = chai.spy.on(FakeDomInteractor.prototype, 'fillRect')
        comp.Entity!.IsActive = true
        comp.Update(0)
        expect(spyFillRect).to.be.called.with(comp.Entity!.Start, comp.Entity!.Size, gameSettings.grid.color.active)

        comp.Entity!.IsActive = false
        comp.Update(0)
        expect(spyFillRect).to.be.called.with(comp.Entity!.Start, comp.Entity!.Size, gameSettings.grid.color.regular)
        chai.spy.restore(FakeDomInteractor.prototype, 'fillRect')
    })
})
