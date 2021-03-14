import {jsonConfigurationParser} from './JsonConfigurationParser'
import {tomlConfigurationParser} from './TomlConfigurationParser'
import {yamlConfigurationParser} from './YamlConfigurationParser'

export const parsers = {
    json: jsonConfigurationParser,
    toml: tomlConfigurationParser,
    yaml: yamlConfigurationParser
}
