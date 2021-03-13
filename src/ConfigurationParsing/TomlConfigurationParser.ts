import Toml from 'toml'
import {ConfigurationParsingError, ParsableConfiguration} from './ParsableConfiguration'

class TomlConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return Toml.parse(rawConfiguration);
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing the toml configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error.message}".`
            )
        }
    }
}

export const tomlConfigurationParser = (): ParsableConfiguration => new TomlConfigurationParser()
