/**
 * A parsable configuration is able to un-serialize a piece of configuration.
 */
export interface ParsableConfiguration {
    parse(rawConfiguration: string): any

    /**
     * Returns true if the configuration can be parsed.
     * @param rawConfiguration
     */
    supports(rawConfiguration: string): boolean
}

/**
 * Thrown when something went wrong while parsing a configuration.
 */
export class ConfigurationParsingError extends Error {
    public readonly parserName: string

    constructor(message: string, parserName: string) {
        super(message || 'Something went wrong while parsing this configuration.');
        this.parserName = parserName
    }
}

export const isConfigurationParsingError = (something: any): something is ConfigurationParsingError =>
    something !== undefined && something !== null && typeof something === 'object' && 'parserName' in something
