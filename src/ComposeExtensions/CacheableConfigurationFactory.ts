import {ComposedConfigurationFactory} from '../Compose'

type GetCurrentTime = () => Date
export type CacheableConfigurationFactoryOptions = { reloadAfterMs: TimeInterval }

class CacheableConfigurationFactory<TConfiguration> implements ComposedConfigurationFactory<TConfiguration> {
    private cachedConfiguration?: TConfiguration
    private lastLoadTime?: Date

    constructor(
        private readonly innerFactory: ComposedConfigurationFactory<TConfiguration>,
        private readonly options: CacheableConfigurationFactoryOptions,
        private readonly getCurrentTime: GetCurrentTime
    ) {
    }

    async create(): Promise<TConfiguration> {
        const lastLoadTime = this.lastLoadTime || this.getCurrentTime()
        const nextReloadDate = new Date(lastLoadTime.valueOf() + this.options.reloadAfterMs.getMs())

        if (nextReloadDate <= this.getCurrentTime() || this.cachedConfiguration === undefined) {
            this.lastLoadTime = lastLoadTime
            this.cachedConfiguration = await this.innerFactory.create()
        }

        return this.cachedConfiguration
    }
}

export const createCacheableConfigurationFactory = <TConfiguration>
    (innerFactory: ComposedConfigurationFactory<TConfiguration>,
     options: CacheableConfigurationFactoryOptions,
     getCurrentTime: GetCurrentTime = () => new Date()): ComposedConfigurationFactory<TConfiguration> =>
        new CacheableConfigurationFactory(innerFactory, options, getCurrentTime)

export class TimeInterval {
    private constructor(private readonly ms: number) {}

    getMs = () => this.ms
    and = (interval: TimeInterval) => TimeInterval.ms(interval.ms + this.ms)

    static ms = (ms: number) => new TimeInterval(ms)
    static seconds = (seconds: number) => TimeInterval.ms(seconds * 1000)
    static minutes = (minutes: number) => TimeInterval.seconds(minutes * 60)
    static hours = (hours: number) => TimeInterval.minutes(hours * 60)
}
