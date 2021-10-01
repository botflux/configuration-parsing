import {yamlConfigurationParser} from './YamlConfigurationParser'

describe('YamlConfigurationParser', function () {
    it('should parse yaml configuration', function () {
        // Arrange
        const configuration = `hello: world`
        const parser = yamlConfigurationParser()

        // Act
        const parsed = parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(parsed).toEqual({ "hello": "world" })
        expect(supports).toBe(true)
    })

    it('should throw when configuration is not yaml', function () {
        // Arrange
        const configuration = `"`
        const parser = yamlConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(configuration)
        const supports = parser.supports(configuration)

        // Assert
        expect(shouldThrow).toThrow(
            `Something went wrong while parsing a yaml configuration. ` +
            `Are you sure that the configuration can be parsed?`)
        expect(supports).toBe(false)
    })
})
