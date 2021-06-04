import { LoopManagerInteractor } from '../port/timeManagerInteractor'
export class ClientLoopManager implements LoopManagerInteractor {
    executeNextLoop (callback: (timestamp: number) => void): void {
        window.webkitRequestAnimationFrame(timestamp => {
            callback(timestamp)
        })
    }
}
