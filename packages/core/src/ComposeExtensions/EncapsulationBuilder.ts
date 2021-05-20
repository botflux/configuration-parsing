import {ComposedConfigurationFactory} from '../Compose'

export type CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions> =
    (innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>) =>
        ComposedConfigurationFactory<TNewConfiguration, TNewLoaderOptions>

export interface EncapsulationBuilder<TConfiguration, TLoaderOptions> {
    encapsulate<TNewConfiguration, TNewLoaderOptions>(createConfigurationFactory: CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions>): EncapsulationBuilder<TNewConfiguration, TNewLoaderOptions>

    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
}

class EncapsulationBuilderImpl<TConfiguration, TLoaderOptions> implements EncapsulationBuilder<TConfiguration, TLoaderOptions> {
    constructor(
        private readonly innerFactory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
    ) {
    }

    build(): ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
        return this.innerFactory
    }

    encapsulate<TNewConfiguration, TNewLoaderOptions>(configurationFactory: CreateConfigurationFactory<TConfiguration, TLoaderOptions, TNewConfiguration, TNewLoaderOptions>): EncapsulationBuilder<TNewConfiguration, TNewLoaderOptions> {
        return new EncapsulationBuilderImpl(configurationFactory(this.innerFactory))
    }
}

export const createEncapsulationBuilder = <TConfiguration, TLoaderOptions>(factory: ComposedConfigurationFactory<TConfiguration, TLoaderOptions>): EncapsulationBuilder<TConfiguration, TLoaderOptions> =>
    new EncapsulationBuilderImpl(factory)
