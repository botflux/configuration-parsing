import {ConfigurationValidationError, ValidableConfiguration} from '../ValidableConfiguration'
import Joi from 'joi'

class JoiConfigurationValidation<TConfiguration> implements ValidableConfiguration<TConfiguration> {
    constructor(private readonly joiObjectSchema: Joi.ObjectSchema) {}

    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        return this.joiObjectSchema.validateAsync(unvalidatedConfiguration)
            .catch(joiError => Promise.reject(new ConfigurationValidationError(
                `Something went wrong while validating a configuration. ` +
                `Inner error: "${joiError.message}"`
            )))
    }
}

export const joiConfigurationValidator = <TConfiguration> (joiObjectSchema: Joi.ObjectSchema) =>
    new JoiConfigurationValidation<TConfiguration>(joiObjectSchema)
