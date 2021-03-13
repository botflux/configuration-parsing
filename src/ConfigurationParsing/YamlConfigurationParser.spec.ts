import {yamlConfigurationParser} from './YamlConfigurationParser'

describe('YamlConfigurationParser', function () {
    it('should parse yaml configuration', function () {
        // Arrange
        const parser = yamlConfigurationParser()

        // Act
        const parsed = parser.parse(`hello: world`)

        // Assert
        expect(parsed).toEqual({ "hello": "world" })
    })

    it('should throw when configuration is not yaml', function () {
        // Arrange
        const parser = yamlConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(`"`)

        // Assert
        expect(shouldThrow).toThrow(
            `Something went wrong while parsing a yaml configuration. ` +
            `Are you that the configuration can be parsed? Inner message: "Missing closing "quote".`)
    })
})
