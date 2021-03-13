/**
 * A loadable configuration is able to fetch a piece of configuration from a location.
 */
export interface LoadableConfiguration {
    load(): Promise<string>
}

/**
 * Thrown when something went wrong while loading a configuration.
 */
export class ConfigurationLoadingError extends Error {
    constructor(message: string) {
        super(message);
    }
}
