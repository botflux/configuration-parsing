import Toml from 'toml'
import {ConfigurationParsingError, ParsableConfiguration} from '@configuration-parsing/core'

const isToml = (rawConfiguration: string) => {
    try {
        Toml.parse(rawConfiguration)
        return true
    } catch (e) {
        return false
    }
}

class TomlConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return Toml.parse(rawConfiguration);
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing the toml configuration. ` +
                `Are you that the configuration can be parsed? `,
                TomlConfigurationParser.name,
                error
            )
        }
    }

    supports(rawConfiguration: string): boolean {
        return isToml(rawConfiguration);
    }
}

export const parserName: string = TomlConfigurationParser.name

export const tomlConfigurationParser = (): ParsableConfiguration => new TomlConfigurationParser()
