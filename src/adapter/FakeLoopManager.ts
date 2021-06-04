import { LoopManagerInteractor } from '../port/timeManagerInteractor'
export class FakeLoopManager implements LoopManagerInteractor {
    constructor (maxExecutionTime?:number) {
        this.maxExecutionTimes = maxExecutionTime
    }

    executeNextLoop (callback: (timestamp: number) => void): void {
        if (!this.maxExecutionTimes || this.executedTimes < this.maxExecutionTimes) {
            this.executedTimes++
            callback(Date.now())
        }
    }

    private executedTimes = 0
    private maxExecutionTimes:number|undefined
}
