import {ParsedLoadableConfiguration, LoadableConfiguration} from './ConfigurationLoading/LoadableConfiguration'
import {ValidatableConfiguration} from './ConfigurationValidation/ValidatableConfiguration'
import {ParsableConfiguration} from './ConfigurationParsing/ParsableConfiguration'

export interface WithValidatableBuildable<TConfiguration> {
    validatingWith(validatable: ValidatableConfiguration<TConfiguration>): ComposedConfigurationFactory<TConfiguration>
}

export interface ComposedConfigurationFactory<TConfiguration> {
    create(): Promise<TConfiguration>
}

class ParsedLoadableConfigurationFactory<TConfiguration, TParsedConfiguration> implements ComposedConfigurationFactory<TConfiguration> {
    constructor(private readonly validatable: ValidatableConfiguration<TConfiguration>,
                private readonly parsable: ParsedLoadableConfiguration<TParsedConfiguration>) {}

    create(): Promise<TConfiguration> {
        return this.parsable.load()
            .then(unvalidatedConfiguration => this.validatable.validate(unvalidatedConfiguration))
    }
}

class LoadableConfigurationFactory<TConfiguration> implements ComposedConfigurationFactory<TConfiguration> {
    constructor(private readonly loadable: LoadableConfiguration,
                private readonly parsable: ParsableConfiguration,
                private readonly validatable: ValidatableConfiguration<TConfiguration>
    ) {}

    create(): Promise<TConfiguration> {
        return this.loadable.load()
            .then(rawConfiguration => this.parsable.parse(rawConfiguration))
            .then(unvalidatedConfiguration => this.validatable.validate(unvalidatedConfiguration))
    }
}

export const fromParsedLoadable = <TParsedConfiguration, TOutputConfiguration extends TParsedConfiguration> (parsable: ParsedLoadableConfiguration<TParsedConfiguration>): WithValidatableBuildable<TOutputConfiguration> => ({
    validatingWith: (validatable: ValidatableConfiguration<TOutputConfiguration>) =>
        new ParsedLoadableConfigurationFactory<TOutputConfiguration, TParsedConfiguration>(validatable, parsable)
})

interface WithParsable<TConfiguration> {
    parsingWith(parsable: ParsableConfiguration): WithValidatableBuildable<TConfiguration>
}

export const fromLoadable = <TConfiguration> (loadable: LoadableConfiguration): WithParsable<TConfiguration> => ({
    parsingWith(parsable: ParsableConfiguration): WithValidatableBuildable<TConfiguration> {
        return {
            validatingWith(validatable: ValidatableConfiguration<TConfiguration>): ComposedConfigurationFactory<TConfiguration> {
                return new LoadableConfigurationFactory(loadable, parsable, validatable)
            }
        }
    }
})
