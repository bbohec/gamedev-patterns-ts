import { DomInteractor } from '../port/domInteractor'
import { gameSettings } from '../settings'
import { Canvas, Vector2D } from '../utils'

export class CanvasLayer {
    // eslint-disable-next-line no-useless-constructor
    constructor (
        private interactWithDom:DomInteractor
    ) {}

    public get Background (): Canvas {
        if (!this._background) this._background = this.InitCanvas(0)
        return this._background
    }

    public get Foreground (): Canvas {
        if (!this._foreground) this._foreground = this.InitCanvas(1)
        return this._foreground
    }

    private InitCanvas (layerOrder:number): Canvas {
        const size = (gameSettings.grid.nodeSize + gameSettings.grid.nodeOffset) * gameSettings.grid.dimension + gameSettings.grid.nodeOffset
        const canvas = new Canvas(new Vector2D(size, size), this.interactWithDom)
        canvas.Awake()
        canvas.setLayerOrder(layerOrder)
        return canvas
    }

    private _background: Canvas|undefined
    private _foreground: Canvas|undefined
}
