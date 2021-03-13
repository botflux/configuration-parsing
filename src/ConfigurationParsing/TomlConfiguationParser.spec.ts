import {tomlConfigurationParser} from './TomlConfigurationParser'

describe('TomlConfigurationParser', function () {
    it('should parse a configuration', function () {
        // Arrange
        const parser = tomlConfigurationParser()

        // Act
        const parsed = parser.parse(`hello = "world"`)

        // Assert
        expect(parsed).toEqual({ hello: 'world' })
    })

    it('should throw when configuration is not toml', function () {
        // Arrange
        const parser = tomlConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(`h`)

        // Assert
        expect(shouldThrow).toThrow("Something went wrong while parsing the toml configuration. Are you that the configuration can be parsed? Inner message: \"Expected \"=\", [ \\t] or [A-Za-z0-9_\\-] but end of input found.\".")
    })
})
