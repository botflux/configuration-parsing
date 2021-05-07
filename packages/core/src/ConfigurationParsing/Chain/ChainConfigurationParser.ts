import {ConfigurationParsingError, ParsableConfiguration} from '../ParsableConfiguration'

class ChainConfigurationParser implements ParsableConfiguration {
    constructor(private readonly parsableConfigurations: ParsableConfiguration[]) {}

    parse(rawConfiguration: string): any {
        const parsableConfiguration = this.parsableConfigurations
            .find(parsableConfiguration => parsableConfiguration.supports(rawConfiguration))

        if (!parsableConfiguration) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a configuration. ` +
                `There is no parser supporting the given configuration.`,
                ChainConfigurationParser.name
            )
        }

        return parsableConfiguration.parse(rawConfiguration)
    }

    supports(rawConfiguration: string): boolean {
        return this.parsableConfigurations.reduce((previousValue: boolean, currentValue) =>
            previousValue || currentValue.supports(rawConfiguration), false)
    }
}

export const parserName: string = ChainConfigurationParser.name

export const chainConfigurationParser = (parsableConfigurations: ParsableConfiguration[]): ParsableConfiguration =>
    new ChainConfigurationParser(parsableConfigurations)
