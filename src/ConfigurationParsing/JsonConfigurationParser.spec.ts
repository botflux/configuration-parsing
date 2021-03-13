import {jsonConfigurationParser} from './JsonConfigurationParser'

describe('JsonConfigurationParser', function () {
    it('should parse a json configuration', function () {
        // Arrange
        const parser = jsonConfigurationParser()

        // Act
        const parsed = parser.parse(`{
            "hello": "world"
        }`)

        // Assert
        expect(parsed).toEqual({ hello: 'world' })
    })

    it('should throw when configuration is not json', function () {
        // Arrange
        const parser = jsonConfigurationParser()

        // Act
        const shouldThrow = () => parser.parse(`[hello]`)

        // Assert
        expect(shouldThrow).toThrow(
            `Something went wrong while parsing a json configuration. ` +
            `Are you that the configuration can be parsed? ` +
            `Inner message: "SyntaxError: Unexpected token h in JSON at position 1".`
        )
    })
})
