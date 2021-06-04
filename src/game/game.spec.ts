import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
// import sinon = require('sinon')
import { Game } from '.'
import { Grid } from '../grid'
import { Fleet } from '../fleet'
import { GameInputComponent } from './components'
import { mockGameFactory } from './game.mock'
chai.use(spies)
const expect = chai.expect

describe('>>> Game', () => {
    let game:Game

    beforeEach(() => {
        game = mockGameFactory()
    })
    it('should start update loop next frame after awake', () => {
        const spy = chai.spy.on(game, 'Update')
        game.Awake()
        expect(spy).to.be.called.exactly(1)
    })
    it('should awake and update all Components', () => {
        const spyAwakeGameClickComp = chai.spy.on(GameInputComponent.prototype, 'Awake')
        const spyUpdateGameClickComp = chai.spy.on(GameInputComponent.prototype, 'Update')

        expect(spyAwakeGameClickComp).not.to.be.called()
        expect(spyUpdateGameClickComp).not.to.be.called()

        game.Awake()
        expect(spyAwakeGameClickComp).to.be.called()

        game.Update(0)
        expect(spyUpdateGameClickComp).to.be.called()
    })
    it('should awake and update all children', () => {
        const spyGridAwake = chai.spy.on(Grid.prototype, 'Awake')
        const spyGridUpdate = chai.spy.on(Grid.prototype, 'Update')
        const spyFleetAwake = chai.spy.on(Fleet.prototype, 'Awake')
        const spyFleetUpdate = chai.spy.on(Fleet.prototype, 'Update')

        expect(spyGridAwake).not.to.be.called()
        expect(spyGridUpdate).not.to.be.called()
        expect(spyFleetAwake).not.to.be.called()
        expect(spyFleetUpdate).not.to.be.called()

        game.Awake()
        expect(spyGridAwake).to.be.called()
        expect(spyFleetAwake).to.be.called()

        game.Update(Date.now())
        expect(spyGridUpdate).to.be.called()
        expect(spyFleetUpdate).to.be.called()
    })
})
