/**
 * A loadable configuration is able to fetch a piece of configuration from a location.
 */
export interface LoadableConfiguration<TLoaderOptions> {
    load(options: TLoaderOptions): Promise<string>
}

/**
 * An already parsed loadable configuration is able to fetch an already parsed piece of configuration.
 */
export interface ParsedLoadableConfiguration<TConfiguration, TLoaderOptions> {
    load(options: TLoaderOptions): Promise<TConfiguration>
}

/**
 * Thrown when something went wrong while loading a configuration.
 */
export class ConfigurationLoadingError extends Error {
    public readonly loaderName: string
    public readonly innerError: unknown | undefined

    constructor(message: string, loaderName: string, innerError?: unknown) {
        super(message || 'Something went wrong while loading a configuration.');
        this.loaderName = loaderName
        this.innerError = innerError

        Object.setPrototypeOf(this, ConfigurationLoadingError.prototype);
    }

    hasInnerError (): boolean {
        return this.innerError !== undefined && this.innerError !== null
    }
}

export const isConfigurationLoadingError = (something: any): something is ConfigurationLoadingError =>
    something !== undefined && something !== null && typeof something === 'object' && 'loaderName' in something
