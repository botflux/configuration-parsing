import { ConfigurationValidationError, ValidatableConfiguration } from '@configuration-parsing/core'
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv'

class AjvConfigurationValidator<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    private readonly validateFunction: ValidateFunction<TConfiguration>

    constructor(
        schema: JSONSchemaType<TConfiguration>,
        ajv: Ajv = new Ajv()
    ) {
        this.validateFunction = ajv.compile(schema)
    }

    async validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        if (this.validateFunction(unvalidatedConfiguration)) {
            return unvalidatedConfiguration
        }

        throw new ConfigurationValidationError(
            "Something went wrong while validating a configuration using the ajv validator.",
            AjvConfigurationValidator.name,
            this.validateFunction.errors
        )
    }
}

/**
 * Create a new ajv configuration validator by passing an ajv schema
 * and optionally an ajv instance.
 *
 * The ajv schema parameter is not typed because it creates typescript compilation errors.
 *
 * @param schema The ajv schema
 * @param ajv
 */
export const ajvConfigurationValidator = <TConfiguration> (
    schema: any,
    ajv: Ajv = new Ajv()
): ValidatableConfiguration<TConfiguration> => new AjvConfigurationValidator(schema, ajv)
