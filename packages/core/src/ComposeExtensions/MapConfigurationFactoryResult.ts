import {ComposedConfigurationFactory} from '../Compose'

export type MapConfigurationFactoryResultFunction<TConfiguration, TNewConfiguration> = (configuration: TConfiguration) => TNewConfiguration

class MapConfigurationFactoryResultFactory<TConfiguration, TLoaderOptions, TNewConfiguration> implements ComposedConfigurationFactory<TNewConfiguration, TLoaderOptions> {
    constructor(
        private readonly factory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>,
        private readonly mapConfiguration: MapConfigurationFactoryResultFunction<TConfiguration, TNewConfiguration>
    ) {
    }

    create(options: TLoaderOptions): Promise<TNewConfiguration> {
        return this.factory.create(options)
            .then(configuration => this.mapConfiguration(configuration))
    }

}

export function mapConfigurationFactoryResult<TConfiguration, TNewConfiguration>(mapConfiguration: MapConfigurationFactoryResultFunction<TConfiguration, TNewConfiguration>) {
    return function (factory: ComposedConfigurationFactory<TConfiguration, unknown>) {
        return new MapConfigurationFactoryResultFactory(factory, mapConfiguration)
    }
}
