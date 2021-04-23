type GetCurrentTime = () => Date

export interface ClockInterface {
    isBefore(date: Date): boolean

    isAfter(date: Date): boolean
}

class Clock implements ClockInterface {
    constructor(private readonly getCurrentTime: GetCurrentTime) {
    }

    isBefore(date: Date): boolean {
        return date < this.getCurrentTime()
    }

    isAfter(date: Date): boolean {
        return date > this.getCurrentTime()
    }
}

export const createClock = (getCurrentTime: GetCurrentTime): ClockInterface =>
    new Clock(getCurrentTime)
