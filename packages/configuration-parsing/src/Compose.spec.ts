import {
    configurationEnvironmentLoader,
    ProcessEnv
} from './ConfigurationLoading/Environment/EnvironmentConfigurationLoader'
import {joiConfigurationValidator} from './ConfigurationValidation/Joi/JoiConfigurationValidator'
import Joi from 'joi'
import {fromParsedLoadable, fromLoadable} from './Compose'
import {configurationFileLoader, FileLoaderOptions} from './ConfigurationLoading/File/ConfigurationFileLoader'
import {jsonConfigurationParser} from './ConfigurationParsing/Json/JsonConfigurationParser'
import { resolve } from 'path'

describe('Compose', function () {
    describe('fromAlreadyParsedLoadableConfiguration', function () {
        it('should compose and load configuration components', async function () {
            // Arrange
            type Configuration = { HELLO: string }
            const loader = configurationEnvironmentLoader()
            const validator = joiConfigurationValidator<Configuration>(Joi.object({
                HELLO: Joi.string()
            }))
            const composed = fromParsedLoadable<ProcessEnv, Configuration, ProcessEnv>(loader)
                .validatingWith(validator)

            // Act
            const promise: Promise<Configuration> = composed.create({ HELLO: 'world' })

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

            const loader = configurationFileLoader()
            const parser = jsonConfigurationParser()
            const validator = joiConfigurationValidator<Configuration>(Joi.object({
                hello: Joi.object({
                    db: Joi.string()
                })
            }))
            const composed = fromLoadable<Configuration, FileLoaderOptions>(loader)
                .parsingWith(parser)
                .validatingWith(validator)

            // Act
            const promise: Promise<Configuration> = composed.create({ fileLocation: resolve(__dirname, '../testing/config.json') })

            // Assert
            await expect(promise).resolves.toEqual({
                hello: expect.objectContaining({
                    db: 'uri'
                })
            })
        })
    })
})
