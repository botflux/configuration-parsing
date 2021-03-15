/**
 * A loadable configuration is able to fetch a piece of configuration from a location.
 */
export interface LoadableConfiguration {
    load(): Promise<string>
}

/**
 * An already parsed loadable configuration is able to fetch an already parsed piece of configuration.
 */
export interface ParsedLoadableConfiguration<TConfiguration> {
    load(): Promise<TConfiguration>
}

/**
 * Thrown when something went wrong while loading a configuration.
 */
export class ConfigurationLoadingError extends Error {
    constructor(message: string) {
        super(message || 'Something went wrong while loading a configuration.');
    }
}
