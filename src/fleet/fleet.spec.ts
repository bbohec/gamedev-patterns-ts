/*
import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { IComponent } from '../utils'
import { Fleet, mockFleetFactory } from '.'
import { Ship } from '../ship'
import { gameSettings } from '../settings'
chai.use(spies)
const expect = chai.expect
class C1 implements IComponent {
    public Entity: Fleet|null = null
    public Awake (): void { }
    public Update (deltaTime: number): void {  }
}

class C2 implements IComponent {
    public Entity: Fleet|null = null
    public Awake (): void { }
    public Update (deltaTime: number): void { }
}

describe('>>> Fleet', () => {
    let fleet: Fleet

    const c1 = new C1()
    const c2 = new C2()

    beforeEach(() => {
        fleet = mockFleetFactory()
    })
    it('should awake and update all Components', () => {
        const spyAwake1 = chai.spy.on(c1, 'Awake')
        const spyAwake2 = chai.spy.on(c2, 'Awake')

        const spyUpdate1 = chai.spy.on(c1, 'Update')
        const spyUpdate2 = chai.spy.on(c2, 'Update')

        expect(spyAwake1).not.to.be.called()
        expect(spyAwake2).not.to.be.called()

        expect(spyUpdate1).not.to.be.called()
        expect(spyUpdate2).not.to.be.called()

        fleet.AddComponent(c1)
        fleet.AddComponent(c2)

        fleet.Awake()
        expect(spyAwake1).to.be.called()
        expect(spyAwake2).to.be.called()

        fleet.Update(1)
        expect(spyUpdate1).to.be.called()
        expect(spyUpdate2).to.be.called()
    })
    it('should awake and update all children', () => {
        const spyShipAwake = chai.spy.on(Ship.prototype, 'Awake')
        const spyShipUpdate = chai.spy.on(Ship.prototype, 'Update')

        expect(spyShipAwake).not.to.be.called()
        expect(spyShipUpdate).not.to.be.called()

        fleet.Awake()
        expect(spyShipAwake).to.be.called.exactly(gameSettings.ships.fleetSize)

        fleet.Update(0)
        expect(spyShipUpdate).to.be.called.exactly(gameSettings.ships.fleetSize)
    })
})
*/
