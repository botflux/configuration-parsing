import {chainConfigurationParser, parserName} from './ChainConfigurationParser'
import {jsonConfigurationParser} from '../Json/JsonConfigurationParser'
import {tomlConfigurationParser} from '../Toml/TomlConfigurationParser'
import {ConfigurationParsingError} from '../ParsableConfiguration'

describe('ChainConfigurationParser', function () {
    it('should support multiple parsers', function () {
        // Arrange
        const jsonConfiguration = `{ "hello": "world" }`
        const tomlConfiguration = `foo = "bar"`
        const parser = chainConfigurationParser([
            jsonConfigurationParser(),
            tomlConfigurationParser()
        ])

        // Act
        const parsedJson = parser.parse(jsonConfiguration)
        const parsedToml = parser.parse(tomlConfiguration)
        const supportsJson = parser.supports(jsonConfiguration)
        const supportsToml = parser.supports(tomlConfiguration)

        // Assert
        expect(parsedJson).toEqual({ hello: 'world' })
        expect(parsedToml).toEqual({ foo: 'bar' })
        expect(supportsJson).toBe(true)
        expect(supportsToml).toBe(true)
    })

    it('should throw when not supporting the configuration format', function () {
        // Arrange
        const tomlConfiguration = `hello = "foo"`
        const parser = chainConfigurationParser([
            jsonConfigurationParser(),
        ])

        // Act
        const shouldThrow = () => parser.parse(tomlConfiguration)
        const supportsToml = parser.supports(tomlConfiguration)

        // Assert
        expect(shouldThrow).toThrow(
            new ConfigurationParsingError("Something went wrong while parsing a configuration. There is no parser supporting the given configuration.", parserName)
        )
        expect(supportsToml).toBe(false)
    })
})
