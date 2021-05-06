import {ConfigurationLoadingError, isConfigurationLoadingError} from './LoadableConfiguration'
import {loaderName} from './File/ConfigurationFileLoader'

describe('ConfigurationLoadingError', function () {
    it('should return true when the object is an ConfigurationLoadingError', function () {
        // Arrange
        const error: any = new ConfigurationLoadingError(`Something went wrong`, loaderName);

        // Act
        const isError = isConfigurationLoadingError(error)

        // Assert
        expect(isError).toBe(true)
    })

    it('should return false when the object is not a ConfigurationLoadingError', function () {
        // Arrange
        const myObject: any = {}
        const str: any = 'hello'
        const n: number = 45

        // Act
        const isError1 = isConfigurationLoadingError(myObject)
        const isError2 = isConfigurationLoadingError(str)
        const isError3 = isConfigurationLoadingError(n)

        // Assert
        expect(isError1).toBe(false)
        expect(isError2).toBe(false)
        expect(isError3).toBe(false)
    })

    it('should return true when an error has an inner error', function () {
        // Arrange
        const error = new ConfigurationLoadingError('', '', new Error(''))

        // Act
        const hasInnerError = error.hasInnerError()

        // Assert
        expect(hasInnerError).toBe(true)
    })

    it('should return false when an error has no inner error', function () {
        // Arrange
        const error = new ConfigurationLoadingError('', 'A loader')

        // Act
        const hasInnerError = error.hasInnerError()

        // Assert
        expect(hasInnerError).toBe(false)
    })

    it('should fallback on default error message', function () {
        // Arrange

        // Act
        const error = new ConfigurationLoadingError('', 'my loader')
        const message = error.message

        // Assert
        expect(message).toBe('Something went wrong while loading a configuration.')
    })
})
