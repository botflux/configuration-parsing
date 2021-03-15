import {
    configurationEnvironmentLoader,
    ProcessEnv
} from './ConfigurationLoading/Environment/EnvironmentConfigurationLoader'
import {joiConfigurationValidator} from './ConfigurationValidation/Joi/JoiConfigurationValidator'
import Joi from 'joi'
import {fromAlreadyParsableConfiguration} from './Compose'

describe('Compose', function () {
    describe('fromAlreadyParsedLoadableConfiguration', function () {
        it('should compose and load configuration components', async function () {
            // Arrange
            const loader = configurationEnvironmentLoader({ HELLO: 'world' })
            const validator = joiConfigurationValidator<ProcessEnv>(Joi.object({
                HELLO: Joi.string()
            }))
            const composed = fromAlreadyParsableConfiguration(loader)
                .validatingWith(validator)

            // Act
            const promise = composed.create()

            // Assert
            await expect(promise).resolves.toEqual({
                HELLO: 'world'
            })
        })
    })
})
