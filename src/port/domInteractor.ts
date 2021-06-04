import { Color, Vector2D } from '../utils'
export interface DomInteractor {
    setLayerOrder(order: number):void;
    clearRect(start:Vector2D, size:Vector2D):void;
    fillRect(start:Vector2D, size:Vector2D, color:Color):void;
    fillCircle(center:Vector2D, radius:number, color:Color):void
    createCanvas(size:Vector2D):void;
    getCanvasRect():{top:number, left:number, width:number, height:number}
    getScroll():{top:number, left:number}
}
