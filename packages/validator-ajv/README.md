# `@configuration-parsing/validator-ajv`

A joi validator implementing the `ValidatableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/validator-ajv
```

## Documentation

[https://botlfux.github.io/configuration-parsing](https://botflux.github.io/configuration-parsing)

## Usage

```typescript
import {JSONSchemaType} from 'ajv'
import {ajvConfigurationValidator} from '@configuration-parsing/validator-ajv'

const configurationSchema: JSONSchemaType<{ foo: string }> = {
    type: 'object',
    properties: {
        foo: {
            type: 'string'
        }
    },
    required: [ 'foo' ]
}

const validator = ajvConfigurationValidator(configurationSchema)

const validatedConfiguration = await validator.validate({ foo: 'hello world' })
```
