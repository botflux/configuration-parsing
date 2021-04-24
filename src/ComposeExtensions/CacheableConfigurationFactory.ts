import {ComposedConfigurationFactory} from '../Compose'

type GetCurrentTime = () => Date
type CacheableConfigurationFactoryOptions = { reloadAfterMs: number }

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
        const nextReloadDate = new Date(lastLoadTime.valueOf() + this.options.reloadAfterMs)

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

