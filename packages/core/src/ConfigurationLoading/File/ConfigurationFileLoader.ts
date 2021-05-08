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

class ConfigurationFileLoader implements LoadableConfiguration<FileLoaderOptions> {
    constructor(
        private readonly dependencies: FileLoaderDependencies) {}

    async load(options: FileLoaderOptions): Promise<string> {
        if (!this.dependencies.exists(options.fileLocation)) {
            return Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file. ` +
                `The file at ${options.fileLocation} doesn't exist. Are you this is the correct path?`,
                ConfigurationFileLoader.name
            ))
        }

        try {
            await this.dependencies.access(options.fileLocation, fs.constants.R_OK)
        } catch (e) {
            return Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file. ` +
                `The file at ${options.fileLocation} can't be read. Are you the read access was given?`,
                ConfigurationFileLoader.name,
                e
            ))
        }

        return this.dependencies.readFile(options.fileLocation, 'utf-8')
            .catch(error => Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file (${options.fileLocation}). `,
                ConfigurationFileLoader.name,
                error
            )));
    }
}

export const loaderName: string = ConfigurationFileLoader.name

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
export const configurationFileLoader = (dependencies: FileLoaderDependencies = defaultFileLoaderDependencies): LoadableConfiguration<FileLoaderOptions> =>
    new ConfigurationFileLoader(dependencies)
