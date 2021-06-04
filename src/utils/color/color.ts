export class Color {
    constructor (red: number, green: number, blue: number, alpha: number) {
        const incorrectChannel = (channel:string) => { throw new Error(`Provided incorrect value for ${channel} channel`) }
        if (!Color.IsValidChannel(red)) incorrectChannel('Red')
        if (!Color.IsValidChannel(green)) incorrectChannel('Green')
        if (!Color.IsValidChannel(blue)) incorrectChannel('Blue')
        if (!Color.IsValidChannel(alpha, true)) incorrectChannel('Alpha')
        this.Red = red
        this.Green = green
        this.Blue = blue
        this.Alpha = alpha
    }

    public static IsValidChannel (v: number, isAlpha = false): boolean {
        const max = isAlpha ? 1 : 255
        if (v < 0 || v > max) return false
        if (!isAlpha && v % 1 !== 0) return false
        return true
    }

    public AsString (): string {
        return `rgba(${this.Red}, ${this.Green}, ${this.Blue}, ${this.Alpha})`
    }

    public static FromString (str: string): Color {
        const arr = str
            .replace(/\(|\)|[A-Za-z]/g, '')
            .split(',')
        const red = Number(arr[0])
        const green = Number(arr[1])
        const blue = Number(arr[2])
        const alpha = Number(arr[3])
        if (isNaN(red) || isNaN(green) || isNaN(blue) || isNaN(alpha)) throw new Error('Invalid string')
        return new Color(red, green, blue, alpha)
    }

    public readonly Red: number
    public readonly Green: number
    public readonly Blue: number
    public readonly Alpha: number
}
