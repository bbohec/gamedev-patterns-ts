import { Entity, Vector2D } from '../utils'
import { Node } from '../node'
import { NodeDrawerInteractor } from '../port/nodeDrawerInteractor'
import { GridSeetings } from '../settings'
import { CanvasLayer } from '../canvas-layer'
import { GridOnclickComponent } from '.'
export class Grid extends Entity {
    constructor (
        private nodeDrawerInteractor:NodeDrawerInteractor,
        private gridSettings:GridSeetings,
        private canvasLayer:CanvasLayer
    ) {
        super()
    }

    public Awake (): void {
        this.AddComponent(new GridOnclickComponent())
        super.Awake()
        this.InitNodes()
        for (const node of this._nodes) {
            node.Awake()
        }
    }

    public Update (deltaTime: number): void {
        super.Update(deltaTime)
        for (const node of this._nodes) {
            node.Update(deltaTime)
        }
    }

    public get Nodes ():Node[] {
        return this._nodes
    }

    private InitNodes () {
        const size = this.gridSettings.nodeSize
        const offset = this.gridSettings.nodeOffset
        for (let y = 0; y < this.gridSettings.dimension; y++) {
            for (let x = 0; x < this.gridSettings.dimension; x++) {
                const start = new Vector2D(
                    x * (size + offset) + offset,
                    y * (size + offset) + offset
                )
                const end = new Vector2D(
                    start.x + size,
                    start.y + size
                )
                const index = new Vector2D(x, y)
                const node = new Node(start, end, index, this.nodeDrawerInteractor)
                this._nodes.push(node)
            }
        }
    }

    private _nodes:Node[]=[]
}
