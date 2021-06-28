import {ComposedConfigurationFactory} from '../Compose'
import {mapConfigurationFactoryResult, MapConfigurationFactoryResultFunction} from './MapConfigurationFactoryResult'
import {MapLoaderOptions, mapLoaderOptions as mapConfigurationLoaderOptions} from './MapLoaderOptionConfigurationFactory'
import {createEncapsulationBuilder} from './EncapsulationBuilder'

export type MergeOptions<TConfiguration, TMappedConfiguration, TLoaderOptions, TMappedLoaderOptions> = {
    mapConfiguration: MapConfigurationFactoryResultFunction<TConfiguration, TMappedConfiguration>,
    mapLoaderOptions: MapLoaderOptions<TLoaderOptions, TMappedLoaderOptions>
}

/**
 * A MergeBuilder implementation helps you to merge your configuration factories.
 */
export interface MergeBuilder<TConfiguration, TLoaderOptions> {

    /**
     * Merge a new configuration
     * @param factory
     * @param options
     */
    merge<TNewConfiguration, TNewLoaderOptions, TMappedConfiguration, TMappedLoaderOptions>(
        factory: ComposedConfigurationFactory<TNewConfiguration, TNewLoaderOptions>,
        options?: Partial<MergeOptions<TNewConfiguration, TMappedConfiguration, TNewLoaderOptions, TMappedLoaderOptions>>):
        MergeBuilder<
            (unknown extends TMappedConfiguration ? TNewConfiguration : TMappedConfiguration) & TConfiguration,
            (unknown extends TMappedLoaderOptions ? TNewLoaderOptions : TMappedLoaderOptions) & TLoaderOptions
        >

    /**
     * Create the merged configuration factory.
     */
    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
}

class MergeConfigurationFactory<TConfiguration, TLoaderOptions> implements ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
    constructor(private readonly factories: ComposedConfigurationFactory<any, any>[]) {
    }

    create(options: TLoaderOptions): Promise<TConfiguration> {
        return Promise.all(this.factories.map(factory => factory.create(options)))
            .then(configurations => configurations.reduce((acc, current) => ({...acc, ...current}), {}))
    }
}

const defaultMergeOptions = {
    mapConfiguration: <TConfiguration, TMappedConfiguration = TConfiguration> (configuration: TConfiguration) =>
        configuration as unknown as TMappedConfiguration,
    mapLoaderOptions: <TLoaderOptions, TMappedLoaderOptions> (options: TLoaderOptions) =>
        options as unknown as TMappedLoaderOptions
}

class MergeBuilderImpl<TConfiguration, TLoaderOptions> implements MergeBuilder<TConfiguration, TLoaderOptions> {
    private factories: ComposedConfigurationFactory<any, any>[] = []

    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
        return new MergeConfigurationFactory(this.factories)
    }

    merge<TNewConfiguration, TNewLoaderOptions, TMappedConfiguration, TMappedLoaderOptions>(
        factory: ComposedConfigurationFactory<TNewConfiguration, TNewLoaderOptions>,
        options: Partial<MergeOptions<TNewConfiguration, TMappedConfiguration, TNewLoaderOptions, TMappedLoaderOptions>> = defaultMergeOptions
    ): MergeBuilder<(unknown extends TMappedConfiguration ? TNewConfiguration : TMappedConfiguration) & TConfiguration, (unknown extends TMappedLoaderOptions ? TNewLoaderOptions : TMappedLoaderOptions) & TLoaderOptions> {
        const { mapConfiguration = defaultMergeOptions.mapConfiguration, mapLoaderOptions = defaultMergeOptions.mapLoaderOptions } = options

        const mappedFactory = createEncapsulationBuilder(factory)
            .encapsulate(mapConfigurationFactoryResult(mapConfiguration))
            .encapsulate(mapConfigurationLoaderOptions(mapLoaderOptions))
            .build()

        this.factories = [...this.factories, mappedFactory]

        // @ts-ignore
        return this as MergeBuilder<TNewConfiguration & TConfiguration, TNewLoaderOptions & TLoaderOptions>
    }

    // merge<TNewConfiguration, TNewLoaderOptions, TMappedConfiguration = TNewConfiguration, TMappedLoaderOptions = TNewLoaderOptions>(
    //     factory: ComposedConfigurationFactory<TNewConfiguration, TNewLoaderOptions>,
    //     options: Partial<MergeOptions<TNewConfiguration, TMappedConfiguration, TNewLoaderOptions, TMappedLoaderOptions>> = defaultMergeOptions
    // ): MergeBuilder<TMappedConfiguration & TConfiguration, TNewLoaderOptions & TLoaderOptions> {
    //     const { mapConfiguration = defaultMergeOptions.mapConfiguration, mapLoaderOptions = defaultMergeOptions.mapLoaderOptions } = options
    //     const mappedFactory = mapConfigurationFactoryResult(mapConfiguration)(factory)
    //
    //     this.factories = [...this.factories, mappedFactory]
    //
    //     // @ts-ignore
    //     return this as MergeBuilder<TNewConfiguration & TConfiguration, TNewLoaderOptions & TLoaderOptions>
    // }
}

/**
 * Create merge builder that helps you merge your configuration factories.
 */
export const createMergeBuilder = <TConfiguration, TLoaderOptions>(): MergeBuilder<TConfiguration, TLoaderOptions> =>
    new MergeBuilderImpl()
