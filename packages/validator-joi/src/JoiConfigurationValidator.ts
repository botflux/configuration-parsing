import {ConfigurationValidationError, ValidatableConfiguration} from '@configuration-parsing/core'
import Joi, { AsyncValidationOptions } from 'joi'

class JoiConfigurationValidation<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    constructor(
        private readonly joiObjectSchema: Joi.ObjectSchema,
        private readonly options?: AsyncValidationOptions
    ) {}

    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        return this.joiObjectSchema.validateAsync(unvalidatedConfiguration, this.options)
            .catch(joiError => Promise.reject(new ConfigurationValidationError(
                `Something went wrong while validating a configuration.`,
                JoiConfigurationValidation.name,
                joiError
            )))
    }
}

export const validatorName: string = JoiConfigurationValidation.name

export const joiConfigurationValidator = <TConfiguration> (
    joiObjectSchema: Joi.ObjectSchema,
    options?: AsyncValidationOptions
): ValidatableConfiguration<TConfiguration> =>
    new JoiConfigurationValidation<TConfiguration>(joiObjectSchema, options)
