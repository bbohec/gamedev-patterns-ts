/* eslint-disable no-unused-expressions */
import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { NodeDrawComponent } from './components'
import { Node } from './node'
import { Vector2D } from '../utils'
import { mockNodeFactory } from '.'
chai.use(spies)
const expect = chai.expect

describe('>>> Node', () => {
    let node: Node
    const start = new Vector2D(1, 2)
    const end = new Vector2D(5, 6)
    beforeEach(() => {
        node = mockNodeFactory(start, end)
    })
    it('should awake and update all Components', () => {
        const spyDrawCompAwake = chai.spy.on(NodeDrawComponent.prototype, 'Awake')
        const spyDrawCompUpdate = chai.spy.on(NodeDrawComponent.prototype, 'Update')

        expect(spyDrawCompAwake).not.to.be.called()
        expect(spyDrawCompUpdate).not.to.be.called()

        node.Awake()
        expect(spyDrawCompAwake).to.be.called()

        node.Update(0)
        expect(spyDrawCompUpdate).to.be.called()
    })
    it('should calculate size', () => {
        expect(node.Size.x).to.be.equal(end.x - start.x)
        expect(node.Size.y).to.be.equal(end.y - start.y)
    })
    it('should calculate center point', () => {
        expect(node.Center.x).equal(start.x + node.Size.x / 2)
        expect(node.Center.y).equal(start.y + node.Size.y / 2)
    })
    it('should check if provided point is within occupied area', () => {
        expect(node.Occupies(new Vector2D(3, 2))).to.be.true
        expect(node.Occupies(new Vector2D(6, 2))).to.be.false
        expect(node.Occupies(new Vector2D(3, 7))).to.be.false
    })
})
