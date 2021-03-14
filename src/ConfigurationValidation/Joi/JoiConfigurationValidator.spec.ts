import {joiConfigurationValidator} from './JoiConfigurationValidator'
import Joi from 'joi'
import {ConfigurationValidationError} from '../ValidableConfiguration'

describe('JoiConfigurationValidation', function () {
    it('should validate configuration using joi', async function () {
        // Arrange
        const validator = joiConfigurationValidator(Joi.object({
            hello: Joi.string()
        }))

        // Act
        const promise = validator.validate({ hello: 'world' })

        // Assert
        await expect(promise).resolves.toEqual({
            hello: 'world'
        })
    })

    it('should reject when configuration is not valid', async function () {
        // Arrange
        const validator = joiConfigurationValidator(Joi.object({
            field: Joi.string()
        }))

        // Act
        const promise = validator.validate({ hello: 12 })

        // Assert
        await expect(promise).rejects.toEqual(new ConfigurationValidationError(
            `Something went wrong while validating a configuration. Inner error: ""hello" is not allowed"`
        ))
    })
})
