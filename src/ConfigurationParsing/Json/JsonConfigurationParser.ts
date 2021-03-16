import {ConfigurationParsingError, ParsableConfiguration} from '../ParsableConfiguration'

const isJson = (rawConfiguration: string) => {
    try {
        JSON.parse(rawConfiguration)
        return true
    } catch (e) {
        return false
    }
}

class JsonConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return JSON.parse(rawConfiguration)
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a json configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error.message}".`,
                JsonConfigurationParser.name
            )
        }
    }

    supports(rawConfiguration: string): boolean {
        return isJson(rawConfiguration);
    }
}

export const parserName: string = JsonConfigurationParser.name

export const jsonConfigurationParser = (): ParsableConfiguration => new JsonConfigurationParser()
