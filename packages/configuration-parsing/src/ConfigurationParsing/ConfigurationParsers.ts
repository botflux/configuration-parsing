import {jsonConfigurationParser} from './Json/JsonConfigurationParser'
import {tomlConfigurationParser} from './Toml/TomlConfigurationParser'
import {yamlConfigurationParser} from './Yaml/YamlConfigurationParser'
import {chainConfigurationParser} from './Chain/ChainConfigurationParser'

export const parsers = {
    json: jsonConfigurationParser,
    toml: tomlConfigurationParser,
    yaml: yamlConfigurationParser,
    chain: chainConfigurationParser
}
