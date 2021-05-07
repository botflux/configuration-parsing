import {ValidatableConfiguration} from '../ValidatableConfiguration'

class NullConfigurationValidator<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        return Promise.resolve(unvalidatedConfiguration as TConfiguration);
    }
}

export const emptyConfigurationValidator = <TConfiguration> (): ValidatableConfiguration<TConfiguration> =>
    new NullConfigurationValidator()
