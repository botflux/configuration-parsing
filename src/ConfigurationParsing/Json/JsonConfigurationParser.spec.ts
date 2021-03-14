import {jsonConfigurationParser} from './JsonConfigurationParser'

describe('JsonConfigurationParser', function () {
    it('should parse a json configuration', function () {
        // Arrange
        const configuration = `{
            "hello": "world"
        }`
        const parser = jsonConfigurationParser()

        // Act
        const parsed = parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(parsed).toEqual({ hello: 'world' })
        expect(supports).toBe(true)
    })

    it('should throw when configuration is not json', function () {
        // Arrange
        const configuration = `[hello]`
        const parser = jsonConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(shouldThrow).toThrow(
            `Something went wrong while parsing a json configuration. ` +
            `Are you that the configuration can be parsed? ` +
            `Inner message: "Unexpected token h in JSON at position 1".`
        )
        expect(supports).toBe(false)
    })
})
