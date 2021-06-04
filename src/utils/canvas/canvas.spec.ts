/* eslint-disable no-unused-expressions */
import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import { Canvas, Color, Vector2D } from '..'
import { FakeDomInteractor } from '../../adapter/FakeDomInteractor'
chai.use(require('chai-spies'))
chai.use(require('chai-dom'))
const expect = chai.expect
describe('>>> Canvas', () => {
    const size = new Vector2D(100, 100)
    let canvas: Canvas
    beforeEach(() => {
        canvas = new Canvas(size, new FakeDomInteractor({ top: 20, left: 20, width: 500, height: 500 }))
    })
    it('should create and attach canvas to the DOM when awakens', () => {
        const createCanvas = chai.spy.on(FakeDomInteractor.prototype, 'createCanvas')
        expect(createCanvas).not.to.be.called()
        canvas.Awake()
        expect(createCanvas).to.be.called()
    })
    describe('>> API', () => {
        beforeEach(() => {
            canvas.Awake()
        })

        it('should draw and fill the rect', () => {
            const start = new Vector2D(0, 0)
            const size = new Vector2D(10, 10)
            const spy = chai.spy.on(FakeDomInteractor.prototype, 'fillRect')
            canvas.FillRect(start, size, new Color(255, 255, 255, 1))
            expect(spy).to.be.called()
            chai.spy.restore(FakeDomInteractor.prototype, 'fillRect')
        })

        it('should clear the rect', () => {
            const start = new Vector2D(0, 0)
            const size = new Vector2D(10, 10)
            const spy = chai.spy.on(FakeDomInteractor.prototype, 'clearRect')
            expect(spy).not.to.be.called()
            canvas.ClearRect(start, size)
            expect(spy).to.be.called.with(start, size)
            chai.spy.restore(FakeDomInteractor.prototype, 'clearRect')
        })
        it('should draw and fill the circle', () => {
            const center = new Vector2D(0, 0)
            const radius = 1
            const spy = chai.spy.on(FakeDomInteractor.prototype, 'fillCircle')
            canvas.FillCircle(center, radius, new Color(255, 255, 255, 1))
            expect(spy).to.be.called()
        })
        it('should set css style', () => {
            const spy = chai.spy.on(FakeDomInteractor.prototype, 'setLayerOrder')
            canvas.setLayerOrder(1)
            expect(spy).to.be.called()
        })
        describe('>>> calculate local point by global', () => {
            it('should return null if point is out of canvas boundaries', () => {
                expect(canvas.CalcLocalPointFrom(new Vector2D(0, 0))).to.be.null
                expect(canvas.CalcLocalPointFrom(new Vector2D(541, 400))).to.be.null
                expect(canvas.CalcLocalPointFrom(new Vector2D(400, 541))).to.be.null
            })
            it('should return local point otherwise', () => {
                expect(canvas.CalcLocalPointFrom(new Vector2D(200, 300))).deep.equal(new Vector2D(180, 280))
            })
        })
    })
})
