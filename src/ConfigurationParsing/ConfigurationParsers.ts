import {jsonConfigurationParser} from './Json/JsonConfigurationParser'
import {tomlConfigurationParser} from './Toml/TomlConfigurationParser'
import {yamlConfigurationParser} from './Yaml/YamlConfigurationParser'

export const parsers = {
    json: jsonConfigurationParser,
    toml: tomlConfigurationParser,
    yaml: yamlConfigurationParser
}
