import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { mockShipFactory, Ship, ShipDrawComponent } from '.'
chai.use(spies)
const expect = chai.expect
describe('>>> Ship', () => {
    let ship: Ship

    beforeEach(() => {
        ship = mockShipFactory()
    })

    it('should awake and update all Components', () => {
        const spyDrawCompAwake = chai.spy.on(ShipDrawComponent.prototype, 'Awake')
        const spyDrawCompUpdate = chai.spy.on(ShipDrawComponent.prototype, 'Update')

        expect(spyDrawCompAwake).not.to.be.called()
        expect(spyDrawCompUpdate).not.to.be.called()

        ship.Awake()
        expect(spyDrawCompAwake).to.be.called()

        ship.Update(0)
        expect(spyDrawCompUpdate).to.be.called()
    })
})
