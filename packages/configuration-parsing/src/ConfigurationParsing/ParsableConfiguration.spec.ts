import {ConfigurationParsingError, isConfigurationParsingError} from './ParsableConfiguration'

describe('ConfigurationParsingError', function () {
    it('should return true when the object is a parsing error', function () {
        // Arrange
        const error: any = new ConfigurationParsingError('My error', 'A parser')

        // Act
        const isError = isConfigurationParsingError(error)

        // Assert
        expect(isError).toBe(true)
    })

    it('should return false when the object is not a parsing error', function () {
        // Arrange
        const obj: any = {}
        const str: any = 'foo'
        const n: any = 12

        // Act
        const isError1 = isConfigurationParsingError(obj)
        const isError2 = isConfigurationParsingError(str)
        const isError3 = isConfigurationParsingError(n)

        // Assert
        expect(isError1).toBe(false)
        expect(isError2).toBe(false)
        expect(isError3).toBe(false)
    })

    it('should return true when an error has an inner error', function () {
        // Arrange
        const error = new ConfigurationParsingError('', '', new Error(''))

        // Act
        const hasInnerError = error.hasInnerError()

        // Assert
        expect(hasInnerError).toBe(true)
    })

    it('should return false when an error has no inner error', function () {
        // Arrange
        const error = new ConfigurationParsingError('', 'A loader')

        // Act
        const hasInnerError = error.hasInnerError()

        // Assert
        expect(hasInnerError).toBe(false)
    })

    it('should fallback on default message', function () {
        // Arrange

        // Act
        const error = new ConfigurationParsingError('', 'my parser')

        // Assert
        expect(error.message).toBe('Something went wrong while parsing this configuration.')
    })
})
