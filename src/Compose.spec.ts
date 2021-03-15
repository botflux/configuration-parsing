import {
    configurationEnvironmentLoader,
    ProcessEnv
} from './ConfigurationLoading/Environment/EnvironmentConfigurationLoader'
import {joiConfigurationValidator} from './ConfigurationValidation/Joi/JoiConfigurationValidator'
import Joi from 'joi'
import {fromParsedLoadable, fromLoadable} from './Compose'
import {configurationFileLoader} from './ConfigurationLoading/File/ConfigurationFileLoader'
import {jsonConfigurationParser} from './ConfigurationParsing/Json/JsonConfigurationParser'

describe('Compose', function () {
    describe('fromAlreadyParsedLoadableConfiguration', function () {
        it('should compose and load configuration components', async function () {
            // Arrange
            type Configuration = { HELLO: string }
            const loader = configurationEnvironmentLoader({ HELLO: 'world' })
            const validator = joiConfigurationValidator<Configuration>(Joi.object({
                HELLO: Joi.string()
            }))
            const composed = fromParsedLoadable<ProcessEnv, Configuration>(loader)
                .validatingWith(validator)

            // Act
            const promise: Promise<Configuration> = composed.create()

            // Assert
            await expect(promise).resolves.toEqual({
                HELLO: 'world'
            })
        })
    })

    describe('fromLoadable', function () {
        it('should compose and load configuration components', async function () {
            // Arrange
            type Configuration = { hello: { db: string } }

            const loader = configurationFileLoader({ fileLocation: 'testing/config.json' })
            const parser = jsonConfigurationParser()
            const validator = joiConfigurationValidator<Configuration>(Joi.object({
                hello: Joi.object({
                    db: Joi.string()
                })
            }))
            const composed = fromLoadable<Configuration>(loader)
                .parsingWith(parser)
                .validatingWith(validator)

            // Act
            const promise: Promise<Configuration> = composed.create()

            // Assert
            await expect(promise).resolves.toEqual({
                hello: expect.objectContaining({
                    db: 'uri'
                })
            })
        })
    })
})
