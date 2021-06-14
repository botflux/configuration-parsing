import {jsoncConfigurationParser} from './JsoncConfigurationParser'

describe('JsoncConfiguration', function () {
    it('should parse a configuration', function () {
        // Arrange
        const configuration = `{
            // My configuration
            "hello": "world"
        }`
        const parser = jsoncConfigurationParser()

        // Act
        const parsed = parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(parsed).toEqual({ hello: 'world' })
        expect(supports).toBe(true)
    })

    it('should throw when configuration is not toml', function () {
        // Arrange
        const configuration = `h`
        const parser = jsoncConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(shouldThrow).toThrow("Something went wrong while parsing the toml configuration. Are you that the configuration can be parsed?")
        expect(supports).toBe(false)
    })
})
