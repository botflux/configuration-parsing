import {joiConfigurationValidator, validatorName} from './JoiConfigurationValidator'
import Joi from 'joi'
import {ConfigurationValidationError} from '@configuration-parsing/core'

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
            `Something went wrong while validating a configuration.`,
            validatorName
        ))
    })

    it('should allow passing joi validation options', async function () {
        // Arrange
        const validator = joiConfigurationValidator(Joi.object({
            field: Joi.string()
        }), {
            allowUnknown: true
        })

        // Act
        const promise = validator.validate({ field: 'hello', foo: 'bar' })

        // Assert
        await expect(promise).resolves.toEqual({
            field: 'hello',
            foo: 'bar'
        })
    })
})
