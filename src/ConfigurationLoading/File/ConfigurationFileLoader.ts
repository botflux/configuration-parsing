import fs from 'fs'
import {ConfigurationLoadingError, LoadableConfiguration} from '../LoadableConfiguration'

export type FileLoaderOptions = {
    fileLocation: string,
}

export type FileLoaderDependencies = {
    readFile: typeof fs.promises.readFile,
    exists: typeof fs.existsSync
    access: typeof fs.promises.access
}

class ConfigurationFileLoader implements LoadableConfiguration {
    constructor(
        private readonly options: FileLoaderOptions,
        private readonly dependencies: FileLoaderDependencies) {}

    async load(): Promise<string> {
        if (!this.dependencies.exists(this.options.fileLocation)) {
            return Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file. ` +
                `The file at ${this.options.fileLocation} doesn't exist. Are you this is the correct path?`
            ))
        }

        try {
            await this.dependencies.access(this.options.fileLocation, fs.constants.R_OK)
        } catch (e) {
            return Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file. ` +
                `The file at ${this.options.fileLocation} can't be read. Are you the read access was given?`
            ))
        }

        return this.dependencies.readFile(this.options.fileLocation, 'utf-8')
            .catch(error => Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file (${this.options.fileLocation}). ` +
                error.message
            )));
    }
}

export const defaultFileLoaderDependencies = {
    readFile: fs.promises.readFile,
    exists: fs.existsSync,
    access: fs.promises.access
}

/**
 * Creates a configuration file loader.
 * @param options
 * @param dependencies
 */
export const configurationFileLoader = (options: FileLoaderOptions, dependencies: FileLoaderDependencies = defaultFileLoaderDependencies) =>
    new ConfigurationFileLoader(options, dependencies)
