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

// Creating the different component
// Loadable are able to load raw piece of configuration.
const fileLoader = loaders.file({ location: 'testing/configuration.json' })

// Parsable are able to parse raw piece of configuration. 
const jsonParser = parsers.json()

// Validatable are able to validate parsed piece of configuration.
const validator = validators.joi(Joi.object({
    hello: Joi.object({
        db: Joi.string()
    })
}))

// You can compose each component to create a configuration factory.
const configurationFactory = fromLoadable(fileLoader)
    .parsingWith(parser)
    .validatingWith(validator)
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
