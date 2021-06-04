export interface LoopManagerInteractor {
    executeNextLoop(callback: (timestamp: number) => void):void;
}
