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
    public readonly innerError: unknown | undefined

    constructor(message: string, parserName: string, innerError?: unknown) {
        super(message || 'Something went wrong while parsing this configuration.');
        this.parserName = parserName
        this.innerError = innerError

        Object.setPrototypeOf(this, ConfigurationParsingError.prototype)
    }

    hasInnerError (): boolean {
        return this.innerError !== undefined && this.innerError !== null
    }
}

export const isConfigurationParsingError = (something: any): something is ConfigurationParsingError =>
    something !== undefined && something !== null && typeof something === 'object' && 'parserName' in something
