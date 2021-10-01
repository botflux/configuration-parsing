import {tomlConfigurationParser} from './TomlConfigurationParser'

describe('TomlConfigurationParser', function () {
    it('should parse a configuration', function () {
        // Arrange
        const configuration = `hello = "world"`
        const parser = tomlConfigurationParser()

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
        const parser = tomlConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(shouldThrow).toThrow("Something went wrong while parsing the toml configuration. Are you sure that the configuration can be parsed?")
        expect(supports).toBe(false)
    })
})
