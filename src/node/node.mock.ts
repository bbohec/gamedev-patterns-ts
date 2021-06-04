import { Vector2D } from '../utils'
import { Node } from '.'
import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { FakeNodeDrawer } from '../adapter/FakeNodeDrawer'
export const mockNodeFactory = (
    start = new Vector2D(0, 0),
    end = new Vector2D(1, 1),
    index = new Vector2D(0, 0),
    nodeDrawerInteractor:NodeDrawerInteractor = new FakeNodeDrawer()
): Node => new Node(start, end, index, nodeDrawerInteractor)
