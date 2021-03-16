import {ConfigurationValidationError, isConfigurationValidationError} from './ValidatableConfiguration'

describe('ConfigurationValidationError', function () {
    it('should return true when giving a ConfigurationValidationError', function () {
        // Arrange
        const error: any = new ConfigurationValidationError('Error', 'A validator')

        // Act
        const isError = isConfigurationValidationError(error)

        // Assert
        expect(isError).toBe(true)
    })

    it('should return false when object is not a ConfigurationValidationError', function () {
        // Arrange
        const obj: any = {}
        const str: any = 'foo'
        const n: any = 42

        // Act
        const isError1 = isConfigurationValidationError(obj)
        const isError2 = isConfigurationValidationError(str)
        const isError3 = isConfigurationValidationError(n)

        // Assert
        expect(isError1).toBe(false)
        expect(isError2).toBe(false)
        expect(isError3).toBe(false)
    })
})
