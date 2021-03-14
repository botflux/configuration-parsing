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
    constructor(message: string) {
        super(message);
    }
}
