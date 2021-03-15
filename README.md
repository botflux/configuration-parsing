# Configuration parsing

A package that helps manage the loading, parsing, validation of your configuration.

# Installation

```shell
npm install configuration-parsing
```

## Architecture

This package is split in 3 main components:

- __ConfigurationLoading__ is in charge of loading configurations from various place using various protocols.
- __ConfigurationParsing__ is in charge of parsing configurations, each parser know how to parse a specific configuration format.
- __ConfigurationValidation__ is in charge of validating parsed configuration. This component makes sure that the configuration is valid.

There is also at the root of this package a set of helpers that will compose those different components together.

## Usage

### Simple usage

Loading a configuration formatted in json from file system. The configuration is validated using a joi schema.

```typescript
import Joi from 'joi'
import {parsers, loaders, validators, fromLoadable} from 'configuration-parsing'

type MyConfiguration = { hello: { db: string } }

// Creating the different component
// Loadable are able to load raw piece of configuration.
const fileLoader = loaders.file({ location: 'testing/configuration.json' })

// Parsable are able to parse raw piece of configuration. 
const jsonParser = parsers.json()

// Validatable are able to validate parsed piece of configuration.
const validator = validators.joi<MyConfiguration>(Joi.object({
    hello: Joi.object({
        db: Joi.string()
    })
}))

// You can compose each component to create a configuration factory.
const configurationFactory = fromLoadable<MyConfiguration>(fileLoader)
    .parsingWith(parser)
    .validatingWith(validator)

const configuration: MyConfiguration = configurationFactory.create()
```

### Another usage

Loading a configuration from environment variables. This example shows you the second interface of the ConfigurationLoading
component. The `ParsedLoadableConfiguration` helps you load an already parsed configuration like env variables.

```typescript
import Joi from 'joi'
import {loaders, validators, fromParsedLoadable} from 'configuration-parsing'

type Configuration = { API_KEY: string }

// ParsedLoadable can load already parsed configuration.
// (process.env is injected as a default parameter)
const parsedLoader = loaders.env()
const validator = validators.joi(Joi.object({
    API_KEY: Joi.string()
}))

const configurationFactory = fromParsedLoadable<ProcessEnv, Configuration>(parsedLoader)
    .validatingWith(validator)

const configuration: Configuration = await configurationFactory.create()
```

### Composing multiple parsers

You can compose multiple parsers using the `parsers.chain()` parser.
Each parser has two methods: `parse(string): any` and `supports(string): bool`.
To find the parser that fits the given configuration, each parser's `supports` method will be called, if the configuration
is supported by the parser then the configuration gets parsed.

```typescript
import {parsers} from 'configuration-parsing'

const rawJson = `{ "hello": "world" }`
const rawYaml = `hello: world`

const yamlAndJsonParsers = parsers.chain([ parsers.yaml(), parsers.json() ])

const parsedJson = yamlAndJsonParsers.parse(rawJson)
const parsedYaml = yamlAndJsonParsers.parse(rawYaml)
```

## Implementing you own loader / parser / validator

### Loaders

#### Normal loaders

Each "normal" loaders must implement the `LoadableConfiguration` interface. It is also recommended hiding the class implementing
the interface using a factory function. `LoadableConfiguration` implementation must always wrap their errors in a `ConfigurationLoadingError`.

Here is the file loader as an example:

```typescript
import fs from 'fs'
import {ConfigurationLoadingError, LoadableConfiguration} from 'configuration-parsing'

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
```

#### Parsed loaders

Each parsed loadable must implement the `ParsedLoadableConfiguration` interface. It is also recommended hiding the class implementing
the interface using a factory function. `ParsedLoadableConfiguration` implementation must always wrap their errors in a `ConfigurationLoadingError`.
Here is the env loader as an example:

```typescript
import {ParsedLoadableConfiguration} from '../LoadableConfiguration'

export type ProcessEnv = {
    [key: string]: string | undefined
}

class EnvironmentConfigurationLoader implements ParsedLoadableConfiguration<ProcessEnv> {
    constructor(private readonly env: ProcessEnv = process.env) {}

    load(): Promise<ProcessEnv> {
        return Promise.resolve(this.env);
    }
}

export const configurationEnvironmentLoader = (env: ProcessEnv = process.env): ParsedLoadableConfiguration<ProcessEnv> =>
    new EnvironmentConfigurationLoader(env)

```

### Parsers

Each parser must implement the `ParsableConfiguration` interface. It is also recommended hiding the class implementing 
the interface using a factory function. 
`ParsableConfiguration` implementation must always wrap their errors in a `ConfigurationParsingError`.

Here is the json parser as an example:

```typescript
import {ConfigurationParsingError, ParsableConfiguration} from '../ParsableConfiguration'

const isJson = (rawConfiguration: string) => {
    try {
        JSON.parse(rawConfiguration)
        return true
    } catch (e) {
        return false
    }
}

// The implementation should not be exported
class JsonConfigurationParser implements ParsableConfiguration {
    parse(rawConfiguration: string): any {
        try {
            return JSON.parse(rawConfiguration)
        } catch (error) {
            // Errors are wrapped using a ConfigurationParsingError
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a json configuration. ` +
                `Are you that the configuration can be parsed? ` +
                `Inner message: "${error.message}".`
            )
        }
    }

    supports(rawConfiguration: string): boolean {
        return isJson(rawConfiguration);
    }
}

// The factory function returnes a ParsableConfiguration
export const jsonConfigurationParser = (): ParsableConfiguration => new JsonConfigurationParser()
```

### Validators

Each validator must implement the `ValidatableConfiguration` interface. It is also recommended hiding the class implementing
the interface using a factory function.
`ValidatableConfiguration` implementation must always wrap their errors in a `ConfigurationValidatingError`.

Here is the joi validator as an example:

```typescript
import {ConfigurationValidationError, ValidatableConfiguration} from '../ValidatableConfiguration'
import Joi from 'joi'

class JoiConfigurationValidation<TConfiguration> implements ValidatableConfiguration<TConfiguration> {
    constructor(private readonly joiObjectSchema: Joi.ObjectSchema) {}

    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration> {
        return this.joiObjectSchema.validateAsync(unvalidatedConfiguration)
            .catch(joiError => Promise.reject(new ConfigurationValidationError(
                `Something went wrong while validating a configuration. ` +
                `Inner error: "${joiError.message}"`
            )))
    }
}

export const joiConfigurationValidator = <TConfiguration> (joiObjectSchema: Joi.ObjectSchema) =>
    new JoiConfigurationValidation<TConfiguration>(joiObjectSchema)
```

## Building the project

The project is testing in node 10, 12 and 14.

```shell
npm i
npm run build
```

## Testing the project

```shell
npm run test
npm run test:watch
```
