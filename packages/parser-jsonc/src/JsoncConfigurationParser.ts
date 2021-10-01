import { jsonc } from 'jsonc'
import {ConfigurationParsingError, ParsableConfiguration} from '@configuration-parsing/core'
import {IParseOptions, Reviver} from 'jsonc/lib/interfaces'

class JsoncConfigurationParser implements ParsableConfiguration {
    constructor(private readonly parsingOptions?: IParseOptions | Reviver) {}

    parse(rawConfiguration: string): any {
        try {
            return jsonc.parse(rawConfiguration, this.parsingOptions)
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing the jsonc configuration. ` +
                `Are you sure that the configuration can be parsed? `,
                JsoncConfigurationParser.name,
                error
            )
        }
    }

    supports(rawConfiguration: string): boolean {
        return jsonc.isJSON(rawConfiguration, true)
    }
}

export const parserName: string = JsoncConfigurationParser.name

export const jsoncConfigurationParser = (parsingOptions?: IParseOptions | Reviver): ParsableConfiguration =>
    new JsoncConfigurationParser(parsingOptions)
