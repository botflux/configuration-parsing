import {configurationEnvironmentLoader} from './EnvironmentConfigurationLoader'

describe('EnvironmentConfigurationLoader', function () {
    it('should load environment variables', async function () {
        // Arrange
        const loader = configurationEnvironmentLoader({
            HELLO: 'world',
            FOO: 'bar'
        })

        // Act
        const promise = loader.load()

        // Assert
        await expect(promise).resolves.toEqual(JSON.stringify({
            HELLO: 'world',
            FOO: 'bar'
        }))
    })
})
