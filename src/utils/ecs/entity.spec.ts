import { describe, beforeEach, it } from 'mocha'
import chai = require('chai');
import spies = require('chai-spies')
import { Entity } from './entity'
import { IComponent } from './component'

chai.use(spies)
const expect = chai.expect

class E extends Entity { }
class C1 implements IComponent {
    Awake (): void {
    }

    Update (deltaTime: number): void {
    }

    public Entity: E|null = null
}
class C2 implements IComponent {
    Awake (): void {
    }

    Update (deltaTime: number): void {
    }

    public Entity: E|null = null
}
class C3 implements IComponent {
    Awake (): void {
    }

    Update (deltaTime: number): void {
    }

    public Entity: E|null = null
}

describe('>>> Entity', () => {
    let e: E
    const c1 = new C1()
    const c2 = new C2()
    const c3 = new C3()

    beforeEach(() => {
        e = new E()
    })
    it('should add, remove, get, and check components', () => {
        expect(e.Components.length).equal(0)
        e.AddComponent(c1)
        e.AddComponent(c2)
        e.AddComponent(c3)

        expect(e.Components.length).equal(3)
        expect(e.Components[0]).equal(c1)
        expect(e.Components[1]).equal(c2)
        expect(e.Components[2]).equal(c3)

        e.RemoveComponent(C2)
        expect(e.Components.length).equal(2)
        expect(e.Components[0]).equal(c1)
        expect(e.Components[1]).equal(c3)

        expect(e.GetComponent(C1)).equal(c1)
        expect(e.GetComponent(C3)).equal(c3)

        expect(e.HasComponent(C1)).equal(true)
        expect(e.HasComponent(C3)).equal(true)
    })
    it('should throw error if component wasn\'t found', () => {
        expect(e.HasComponent(C1)).equal(false)
        expect(() => e.GetComponent(C1)).to.Throw()
    })
    it('should awake all Components', () => {
        const spy1 = chai.spy.on(c1, 'Awake')
        const spy2 = chai.spy.on(c2, 'Awake')
        const spy3 = chai.spy.on(c3, 'Awake')

        expect(spy1).not.to.be.called()
        expect(spy2).not.to.be.called()
        expect(spy3).not.to.be.called()

        e.AddComponent(c1)
        e.AddComponent(c2)
        e.AddComponent(c3)

        e.Awake()

        expect(spy1).to.be.called()
        expect(spy2).to.be.called()
        expect(spy3).to.be.called()
    })
    it('should update all Components', () => {
        const spy1 = chai.spy.on(c1, 'Update')
        const spy2 = chai.spy.on(c2, 'Update')
        const spy3 = chai.spy.on(c3, 'Update')

        expect(spy1).not.to.be.called()
        expect(spy2).not.to.be.called()
        expect(spy3).not.to.be.called()

        e.AddComponent(c1)
        e.AddComponent(c2)
        e.AddComponent(c3)

        const deltaTime = 12
        e.Update(deltaTime)

        expect(spy1).to.be.called.with(deltaTime)
        expect(spy2).to.be.called.with(deltaTime)
        expect(spy3).to.be.called.with(deltaTime)
    })
})
