import {ComposedConfigurationFactory} from '../Compose'

export type CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions> =
    (innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>) =>
        ComposedConfigurationFactory<TNewConfiguration, TNewLoaderOptions>

export interface EncapsulationBuilder<TConfiguration, TLoaderOptions> {
    pipe<TNewConfiguration, TNewLoaderOptions>(createConfigurationFactory: CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions>): EncapsulationBuilder<TNewConfiguration, TNewLoaderOptions>

    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
}

class PipeBuilderImpl<TConfiguration, TLoaderOptions> implements EncapsulationBuilder<TConfiguration, TLoaderOptions> {
    constructor(
        private readonly innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
    ) {
    }

    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
        return this.innerFactory
    }

    pipe<TNewConfiguration, TNewLoaderOptions>(configurationFactory: CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions>): EncapsulationBuilder<TNewConfiguration, TNewLoaderOptions> {
        return new PipeBuilderImpl(configurationFactory(this.innerFactory))
    }
}

export const createPipeBuilder = <TConfiguration, TLoaderOptions>(factory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>): EncapsulationBuilder<TConfiguration, TLoaderOptions> =>
    new PipeBuilderImpl(factory)
