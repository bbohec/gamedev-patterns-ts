import { DomInteractor } from '../port/domInteractor'
import { Color, Vector2D } from '../utils'

export class ClientDomInteractor implements DomInteractor {
    getCanvasRect (): { top: number; left: number; width: number; height: number } {
        if (!this._elm) throw new Error('elm is null')
        const context = this._elm.getBoundingClientRect()
        return {
            top: context.top,
            left: context.left,
            width: context.width,
            height: context.height
        }
    }

    getScroll (): { top: number; left: number } {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop,
            left: window.pageXOffset || document.documentElement.scrollLeft
        }
    }

    setLayerOrder (order: number): void {
        this.setStyle({ zIndex: `${order}` })
    }

    private setStyle (style: Partial<CSSStyleDeclaration>): void {
        for (const key in style) {
            if (!Object.hasOwnProperty.call(style, key)) continue
            if (!style[key]) continue
            if (this._elm === null) throw new Error('elm is null.')
            this._elm.style[key] = style[key] as string
        }
    }

    fillCircle (center:Vector2D, radius:number, color:Color): void {
        if (this._ctx === null) throw new Error('ctx is null')
        this._ctx.beginPath()
        this._ctx.arc(center.x, center.y, radius, 0, Math.PI * 2)
        this._ctx.fillStyle = color.AsString()
        this._ctx.fill()
    }

    clearRect (start:Vector2D, size:Vector2D) {
        if (this._ctx === null) throw new Error('ctx is null')
        this._ctx.clearRect(start.x, start.y, size.x, size.y)
    }

    fillRect (start:Vector2D, size:Vector2D, color:Color): void {
        if (this._ctx === null) throw new Error('ctx is null')
        this._ctx.beginPath()
        this._ctx.fillStyle = color.AsString()
        this._ctx.rect(start.x, start.y, size.x, size.y)
        this._ctx.fill()
    }

    createCanvas (size:Vector2D) {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', `${size.x}px`)
        canvas.setAttribute('height', `${size.y}px`)
        document.body.appendChild(canvas)
        this._elm = canvas
        const ctx = this._elm.getContext('2d')
        if (!ctx) throw new Error('Context identifier is not supported')
        this._ctx = ctx
    }

    private _elm: HTMLCanvasElement|null = null
    private _ctx: CanvasRenderingContext2D|null = null
}
