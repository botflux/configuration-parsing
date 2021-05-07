import Yaml from 'yaml'
import {ConfigurationParsingError, ParsableConfiguration} from '@configuration-parsing/core'

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
                `Are you that the configuration can be parsed? `,
                YamlConfigurationParser.name,
                error
            )
        }
    }

    supports(rawConfiguration: string): boolean {
        return isYaml(rawConfiguration);
    }
}

export const parserName: string = YamlConfigurationParser.name

export const yamlConfigurationParser = (): ParsableConfiguration => new YamlConfigurationParser()
