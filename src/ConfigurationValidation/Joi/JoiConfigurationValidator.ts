import {ConfigurationValidationError, ValidatableConfiguration} from '../ValidatableConfiguration'
import Joi from 'joi'

class JoiConfigurationValidation<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    constructor(private readonly joiObjectSchema: Joi.ObjectSchema) {}

    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        return this.joiObjectSchema.validateAsync(unvalidatedConfiguration)
            .catch(joiError => Promise.reject(new ConfigurationValidationError(
                `Something went wrong while validating a configuration.`,
                JoiConfigurationValidation.name,
                joiError
            )))
    }
}

export const validatorName: string = JoiConfigurationValidation.name

export const joiConfigurationValidator = <TConfiguration> (joiObjectSchema: Joi.ObjectSchema) =>
    new JoiConfigurationValidation<TConfiguration>(joiObjectSchema)
