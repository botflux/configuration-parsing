import {configurationEnvironmentLoader} from './EnvironmentConfigurationLoader'

describe('EnvironmentConfigurationLoader', function () {
    it('should load environment variables', async function () {
        // Arrange
        const loader = configurationEnvironmentLoader()

        // Act
        const promise = loader.load({
            HELLO: 'world',
            FOO: 'bar'
        })

        // Assert
        await expect(promise).resolves.toEqual({
            HELLO: 'world',
            FOO: 'bar'
        })
    })
})
