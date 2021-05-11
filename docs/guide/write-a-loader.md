# Write a loader

To write a loader you should implement a loader interface. There are 2 types of loader interface:
- `LoadableConfiguration<TLoaderOptions>` loads configuration as string that will be parsed by a parser later (e.g `ConfigurationFileLoader`).
- `ParsedLoadableConfiguration<TConfiguration, TLoaderOptions>` loads an already parsed configuration (e.g `EnvironmentConfigurationLoader`).

## LoadableConfiguration example

```typescript
import fs from 'fs'
import {ConfigurationLoadingError, LoadableConfiguration} from '@configuration-parsing/core'

// Loader options
export type FileLoaderOptions = {
    fileLocation: string,
}

export type FileLoaderDependencies = {
    readFile: typeof fs.promises.readFile,
    exists: typeof fs.existsSync
    access: typeof fs.promises.access
}

// The class implements the LoadableConfiguration interface with
// its options as type argument.
class ConfigurationFileLoader implements LoadableConfiguration<FileLoaderOptions> {
    constructor(
        private readonly dependencies: FileLoaderDependencies) {}

    async load(options: FileLoaderOptions): Promise<string> {
        if (!this.dependencies.exists(options.fileLocation)) {
            // You can reject a ConfigurationLoadingError
            // when something goes wrong while loading the configuration.
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

        // Just return the configuration as a string.
        return this.dependencies.readFile(options.fileLocation, 'utf-8')
            .catch(error => Promise.reject(new ConfigurationLoadingError(
                `Something went wrong while loading a configuration file (${options.fileLocation}). `,
                ConfigurationFileLoader.name,
                error
            )));
    }
}

export const defaultFileLoaderDependencies = {
    readFile: fs.promises.readFile,
    exists: fs.existsSync,
    access: fs.promises.access
}

// Its recommended to expose a factory instead of the class
// so we don't rely on implementation details.
export const configurationFileLoader = (dependencies: FileLoaderDependencies = defaultFileLoaderDependencies): LoadableConfiguration<FileLoaderOptions> =>
    new ConfigurationFileLoader(dependencies)

```

## ParsedLoadableConfiguration example

```typescript
import {ParsedLoadableConfiguration} from '@configuration-parsing/core'

export type ProcessEnv = {
    [key: string]: string | undefined
}

// The class implements the ParsedLodableConfiguration with the loader options as first type argument
// like for the `LoadableConfiguration` example. As second type argument you pass the already parsed configuration type.
class EnvironmentConfigurationLoader implements ParsedLoadableConfiguration<ProcessEnv, ProcessEnv> {
    load(env: ProcessEnv = process.env): Promise<ProcessEnv> {
        return Promise.resolve(env);
    }
}

export const configurationEnvironmentLoader = (): ParsedLoadableConfiguration<ProcessEnv, ProcessEnv> =>
    new EnvironmentConfigurationLoader()
```
