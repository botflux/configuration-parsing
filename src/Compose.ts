import {AlreadyParsedLoadableConfiguration} from './ConfigurationLoading/LoadableConfiguration'
import {ValidatableConfiguration} from './ConfigurationValidation/ValidatableConfiguration'

export interface WithValidatableBuildable<TConfiguration> {
    validatingWith(validatable: ValidatableConfiguration<TConfiguration>): ComposedConfigurationFactory<TConfiguration>
}

export interface ComposedConfigurationFactory<TConfiguration> {
    create(): Promise<TConfiguration>
}

class ConfigurationFactory<TConfiguration> implements ComposedConfigurationFactory<TConfiguration> {
    constructor(private readonly validatable: ValidatableConfiguration<TConfiguration>,
                private readonly parsable: AlreadyParsedLoadableConfiguration<TConfiguration>) {}

    create(): Promise<TConfiguration> {
        return this.parsable.load()
            .then(unvalidatedConfiguration => this.validatable.validate(unvalidatedConfiguration))
    }
}

export const fromAlreadyParsableConfiguration = <TConfiguration> (parsable: AlreadyParsedLoadableConfiguration<TConfiguration>): WithValidatableBuildable<TConfiguration> => ({
    validatingWith: (validatable: ValidatableConfiguration<TConfiguration>) =>
        new ConfigurationFactory<TConfiguration>(validatable, parsable)
})
