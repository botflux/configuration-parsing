import {configurationFileLoader} from './File/ConfigurationFileLoader'
import {configurationEnvironmentLoader} from './Environment/EnvironmentConfigurationLoader'

export const loaders = {
    file: configurationFileLoader,
    env: configurationEnvironmentLoader
}
