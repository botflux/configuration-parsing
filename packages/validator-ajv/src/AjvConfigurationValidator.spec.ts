import {JSONSchemaType} from 'ajv'
import {ajvConfigurationValidator} from './AjvConfigurationValidator'
import {ConfigurationValidationError} from '@configuration-parsing/core'

describe('AjvConfigurationValidator', function () {
    it('should validate parsed configuration', function () {
        // Arrange
        const schema: JSONSchemaType<{ foo: string }> = {
            type: 'object',
            properties: {
                foo: {
                    type: 'string'
                }
            },
            required: [ 'foo' ]
        }

        const validator = ajvConfigurationValidator(schema)

        // Act
        const validated = validator.validate({ foo: 'hello world' })

        // Assert
        expect(validated).resolves.toEqual({
            foo: 'hello world'
        })
    })

    it('should throw on invalid configuration', function () {
        // Arrange
        const schema: JSONSchemaType<{ foo: string }> = {
            type: 'object',
            properties: {
                foo: {
                    type: 'string'
                }
            },
            required: [ 'foo' ]
        }

        const validator = ajvConfigurationValidator(schema)

        // Act
        const validated = validator.validate({ foo2: 'hello world' })

        // Assert
        expect(validated).rejects.toThrow(ConfigurationValidationError)
    })
})
