import Yaml from 'yaml'
import {ConfigurationParsingError, ParsableConfiguration} from './ParsableConfiguration'

class YamlConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return Yaml.parse(rawConfiguration)
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a yaml configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error.message}".`
            )
        }
    }
}

export const yamlConfigurationParser = (): ParsableConfiguration => new YamlConfigurationParser()
