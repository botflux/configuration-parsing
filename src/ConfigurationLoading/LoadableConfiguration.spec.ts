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
})
