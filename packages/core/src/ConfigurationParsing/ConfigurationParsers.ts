import {jsonConfigurationParser} from './Json/JsonConfigurationParser'
import {chainConfigurationParser} from './Chain/ChainConfigurationParser'

export const parsers = {
    json: jsonConfigurationParser,
    chain: chainConfigurationParser
}
