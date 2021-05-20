import {ComposedConfigurationFactory} from '../Compose'

type MapLoaderOptions<TLoaderOptions, TNewLoaderOptions> = (options: TNewLoaderOptions) => TLoaderOptions

class MapLoaderOptionsConfigurationFactory<TConfiguration, TLoaderOptions, TNewLoaderOptions> implements ComposedConfigurationFactory<TConfiguration, TNewLoaderOptions> {
    constructor(
        private readonly innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>,
        private readonly map: MapLoaderOptions<TLoaderOptions, TNewLoaderOptions>
    ) {
    }

    create(options: TNewLoaderOptions): Promise<TConfiguration> {
        const innerFactoryOptions = this.map(options)
        return this.innerFactory.create(innerFactoryOptions)
    }
}

export const mapLoaderOptions = <TLoaderOptions, TNewLoaderOptions>(map: MapLoaderOptions<TLoaderOptions, TNewLoaderOptions>) =>
    <TConfiguration>(innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>) =>
        new MapLoaderOptionsConfigurationFactory(innerFactory, map)
