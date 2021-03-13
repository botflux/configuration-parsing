import {ParsableConfiguration} from './ParsableConfiguration'
import {ConfigurationLoadingError} from '../ConfigurationLoading/LoadableConfiguration'

class JsonConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return JSON.parse(rawConfiguration)
        } catch (error) {
            throw new ConfigurationLoadingError(
                `Something went wrong while parsing a json configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error}".`
            )
        }
    }
}

export const jsonConfigurationParser = () => new JsonConfigurationParser()
