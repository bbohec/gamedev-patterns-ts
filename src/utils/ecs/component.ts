import { IAwake, IUpdate } from '../lifecycle'
import { Entity } from './entity'
export interface IComponent extends IAwake, IUpdate{
    Entity: Entity | null
}
