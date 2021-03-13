import {ConfigurationParsingError, ParsableConfiguration} from './ParsableConfiguration'

class JsonConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return JSON.parse(rawConfiguration)
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a json configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error.message}".`
            )
        }
    }
}

export const jsonConfigurationParser = (): ParsableConfiguration => new JsonConfigurationParser()
