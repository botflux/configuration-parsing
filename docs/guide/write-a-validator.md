# Write a validator

You need to implement `ValidatableConfiguration<TConfiguration>` to create a new validator.

```typescript
import {ConfigurationValidationError, ValidatableConfiguration} from '@configuration-parsing/core'
import Joi from 'joi'

class JoiConfigurationValidation<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    constructor(private readonly joiObjectSchema: Joi.ObjectSchema) {}

    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        // Validate the configuration and return it.
        return this.joiObjectSchema.validateAsync(unvalidatedConfiguration)
            // Wrap the validation error in a ConfigurationValidationError.
            .catch(joiError => Promise.reject(new ConfigurationValidationError(
                `Something went wrong while validating a configuration.`,
                JoiConfigurationValidation.name,
                joiError
            )))
    }
}

export const joiConfigurationValidator = <TConfiguration> (joiObjectSchema: Joi.ObjectSchema): ValidatableConfiguration<TConfiguration> =>
    new JoiConfigurationValidation<TConfiguration>(joiObjectSchema)
```
