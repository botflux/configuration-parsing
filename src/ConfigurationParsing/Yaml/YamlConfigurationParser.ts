import Yaml from 'yaml'
import {ConfigurationParsingError, ParsableConfiguration} from '../ParsableConfiguration'

const isYaml = (rawConfiguration: string) => {
    try {
        Yaml.parse(rawConfiguration)
        return true
    } catch (e) {
        return false
    }
}

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

    supports(rawConfiguration: string): boolean {
        return isYaml(rawConfiguration);
    }
}

export const yamlConfigurationParser = (): ParsableConfiguration => new YamlConfigurationParser()
