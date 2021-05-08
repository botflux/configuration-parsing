import {ParsedLoadableConfiguration, LoadableConfiguration} from './ConfigurationLoading/LoadableConfiguration'
import {ValidatableConfiguration} from './ConfigurationValidation/ValidatableConfiguration'
import {ParsableConfiguration} from './ConfigurationParsing/ParsableConfiguration'

export interface WithValidatableBuildable<TConfiguration, TLoaderOptions> {
    validatingWith(validatable: ValidatableConfiguration<TConfiguration>): ComposedConfigurationFactory<TConfiguration, TLoaderOptions>
}

export interface ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
    create(options: TLoaderOptions): Promise<TConfiguration>
}

class ParsedLoadableConfigurationFactory<TConfiguration, TParsedConfiguration, TLoaderOptions> implements ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
    constructor(private readonly validatable: ValidatableConfiguration<TConfiguration>,
                private readonly parsable: ParsedLoadableConfiguration<TParsedConfiguration, TLoaderOptions>) {}

    create(loaderOptions: TLoaderOptions): Promise<TConfiguration> {
        return this.parsable.load(loaderOptions)
            .then(unvalidatedConfiguration => this.validatable.validate(unvalidatedConfiguration))
    }
}

class LoadableConfigurationFactory<TConfiguration, TLoaderOptions> implements ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
    constructor(private readonly loadable: LoadableConfiguration<TLoaderOptions>,
                private readonly parsable: ParsableConfiguration,
                private readonly validatable: ValidatableConfiguration<TConfiguration>
    ) {}

    create(options: TLoaderOptions): Promise<TConfiguration> {
        return this.loadable.load(options)
            .then(rawConfiguration => this.parsable.parse(rawConfiguration))
            .then(unvalidatedConfiguration => this.validatable.validate(unvalidatedConfiguration))
    }
}

export const fromParsedLoadable = <TParsedConfiguration, TOutputConfiguration extends TParsedConfiguration, TLoaderOptions> (parsable: ParsedLoadableConfiguration<TParsedConfiguration, TLoaderOptions>): WithValidatableBuildable<TOutputConfiguration, TLoaderOptions> => ({
    validatingWith: (validatable: ValidatableConfiguration<TOutputConfiguration>) =>
        new ParsedLoadableConfigurationFactory<TOutputConfiguration, TParsedConfiguration, TLoaderOptions>(validatable, parsable)
})

interface WithParsable<TConfiguration, TLoaderOptions> {
    parsingWith(parsable: ParsableConfiguration): WithValidatableBuildable<TConfiguration, TLoaderOptions>
}

export const fromLoadable = <TConfiguration, TLoaderOptions> (loadable: LoadableConfiguration<TLoaderOptions>): WithParsable<TConfiguration, TLoaderOptions> => ({
    parsingWith(parsable: ParsableConfiguration): WithValidatableBuildable<TConfiguration, TLoaderOptions> {
        return {
            validatingWith(validatable: ValidatableConfiguration<TConfiguration>): ComposedConfigurationFactory<TConfiguration, TLoaderOptions> {
                return new LoadableConfigurationFactory(loadable, parsable, validatable)
            }
        }
    }
})
