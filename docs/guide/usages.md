# Usages

## Simple usage

As said in the introduction the package is split in 3 components: loaders, parsers and validators.
The following example assumes that you have created a configuration file in `conf/app.json`.

```typescript
import { fromLoadable, parsers, loaders, validators, FileLoaderOptions } from '@configuration-parsing/core'

type MyConfiguration = {
    db: string,
    currentMode: string
}

const factory =
    // We want to load the configuration from file system.
    fromLoadable<MyConfiguration, FileLoaderOptions>(loaders.file())
        // We want to parse the content with the json parser.
        .parsingWith(parsers.json())
        // We skip the validation step.
        .validatingWith(validators.empty())

// Fetch the configuration
const configuration = await factory.create({ location: 'conf/app.json' })
```

## Validate the configuration

In the previous example the validation step was skipped. We can validate our configuration by passing another validator.
For example, we can use `@configuration-parsing/validator-joi` to validate the configuration with a joi schema.

```typescript
import { fromLoadable, parsers, loaders, validators, FileLoaderOptions } from '@configuration-parsing/core'
import { joiConfigurationValidator } from '@configuration-parsing/validator-joi'
import Joi from 'joi'

type MyConfiguration = {
    db: string,
    currentMode: string
}

const myConfigurationSchema = Joi.object({
    db: Joi.string().required(),
    currentMode: Joi.string().required()
})

const factory =
    // We want to load the configuration from file system.
    fromLoadable<MyConfiguration, FileLoaderOptions>(loaders.file())
        // We want to parse the content with the json parser.
        .parsingWith(parsers.json())
        // We validate the configuration using a joi schema.
        .validatingWith(joiConfigurationValidator(myConfigurationSchema))

// Fetch the configuration
const configuration = await factory.create({ location: 'conf/app.json' })
```

## Using another parser

`@configuration-parsing/core` only includes a JSON parser, you can find other parsers in the `@configuration-parsing` namespace.
You can, for example, parse a Toml configuration:

Note: You need to run `npm install @configuration-parsing/parser-toml` to use the toml parser.

```toml
# conf/app.toml
db = "mongodb://root:root@localhost:27017/my-db"
currentMode = "dev"
```

```typescript
import { fromLoadable, loaders, validators, FileLoaderOptions } from '@configuration-parsing/core'
import { joiConfigurationValidator } from '@configuration-parsing/validator-joi'
import { tomlConfigurationParser } from '@configuration-parsing/parser-toml'
import Joi from 'joi'

type MyConfiguration = {
    db: string,
    currentMode: string
}

const myConfigurationSchema = Joi.object({
    db: Joi.string().required(),
    currentMode: Joi.string().required()
})

const factory =
    // We want to load the configuration from file system.
    fromLoadable<MyConfiguration, FileLoaderOptions>(loaders.file())
        // We want to parse the content with the json parser.
        .parsingWith(tomlParser())
        // We validate the configuration using a joi schema.
        .validatingWith(joiConfigurationValidator(myConfigurationSchema))

// Fetch the configuration
const configuration = await factory.create({ location: 'conf/app.toml' })
```

### Combine parsers

You can also combine parser to create a composite parser. It can help
you when you want to use multiple configuration format.

```typescript
import { parsers } from '@configuration-parsing/core'
import { yamlConfigurationParser } from '@configuration-parsing/parser-yaml'
import { tomlConfigurationParser } from '@configuration-parsing/parser-toml'

const chainParser = parsers.chain([
    parsers.json(),
    yamlConfigurationParser(),
    tomlConfigurationParser()
])
```

## Using process.env

Some loaders provide already parsed data such as `loaders.env()`. Those loaders do not use the same interface as 
the previously seen file loader. 

```typescript
import { fromParsedLoadable, loaders, validators, ProcessEnv } from '@configuration-parser/core'
import { joiConfigurationValidator } from '@configuration-parsing/validator-joi'
import Joi from 'joi'

type EnvConfig = { FOO: string }
const envConfigSchema = Joi.object({ FOO: Joi.string().required() })

const factory =
    fromParsedLoadable<EnvConfig, ProcessEnv> (loaders.env())
        .validatingWith(joiConfigurationValidator(envConfigSchema))

const configuration = await factory.create(process.env)
```
