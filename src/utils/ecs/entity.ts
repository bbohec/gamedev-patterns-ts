import { IAwake, IUpdate } from '../lifecycle'
import { IComponent } from './component'

type AbstractComponent<Class> = Function & { prototype: Class }
type PotentialClass<Class> = AbstractComponent<Class> | { new(...args: unknown[]): Class }

export abstract class Entity implements IUpdate, IAwake {
    public Awake (): void {
        for (const component of this._components) {
            component.Awake()
        }
    }

    public Update (deltaTime: number): void {
        for (const component of this._components) {
            component.Update(deltaTime)
        }
    }

    public get Components (): IComponent[] {
        return this._components
    }

    public AddComponent (component:IComponent):void {
        this._components.push(component)
        component.Entity = this
    }

    public GetComponent<Class extends IComponent> (potentialClass: PotentialClass<Class>): Class {
        for (const component of this._components) {
            if (component instanceof potentialClass) return component as Class
        }
        throw new Error(`Component ${potentialClass.name} not found on Entity ${this.constructor.name}`)
    }

    public RemoveComponent<Class extends IComponent> (potentialClass: PotentialClass<Class>): void {
        let toRemove: IComponent | undefined
        let index: number | undefined

        for (let i = 0; i < this._components.length; i++) {
            const component = this._components[i]
            if (component instanceof potentialClass) {
                toRemove = component
                index = i
                break
            }
        }

        if (toRemove && index) {
            toRemove.Entity = null
            this._components.splice(index, 1)
        }
    }

    public HasComponent<Class extends IComponent> (potentialClass: PotentialClass<Class>): boolean {
        for (const component of this._components) {
            if (component instanceof potentialClass) return true
        }
        return false
    }

    protected _components: IComponent[] = []
}
