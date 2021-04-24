import {ComposedConfigurationFactory} from '../Compose'
import {ClockInterface, GetCurrentTime} from '../Clock'

type CacheableConfigurationFactoryOptions = { reloadAfterMs: number }

class CacheableConfigurationFactory<TConfiguration> implements ComposedConfigurationFactory<TConfiguration> {
    private cachedConfiguration?: TConfiguration

    constructor(
        private readonly innerFactory: ComposedConfigurationFactory<TConfiguration>,
        private readonly options: CacheableConfigurationFactoryOptions,
        private readonly clock: ClockInterface,
        private readonly getCurrentTime: GetCurrentTime
    ) {
    }

    async create(): Promise<TConfiguration> {
        const now = this.getCurrentTime()
        const nextReloadDate = new Date(now.valueOf() + this.options.reloadAfterMs)

        if (this.clock.isBefore(nextReloadDate) || this.cachedConfiguration === undefined) {
            this.cachedConfiguration = await this.innerFactory.create()
        }

        return this.cachedConfiguration
    }
}

export const createCacheableConfigurationFactory = <TConfiguration>
    (innerFactory: ComposedConfigurationFactory<TConfiguration>,
     options: CacheableConfigurationFactoryOptions,
     clock: ClockInterface,
     getCurrentTime: GetCurrentTime): ComposedConfigurationFactory<TConfiguration> =>
        new CacheableConfigurationFactory(innerFactory, options, clock, getCurrentTime)
