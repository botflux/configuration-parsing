# `@configuration-parsing/validator-joi`

A joi validator implementing the `ValidatableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/validator-joi
```

## Documentation

[https://botlfux.github.io/configuration-parsing](https://botflux.github.io/configuration-parsing)

## Usage

```typescript
import { joiConfigurationValidator } from '@configuration-parser/validator-joi'
import Joi from 'joi'

const parsedConfiguration = {
    hello: 'world',
    foo: 'bar'
}
const validator = joiConfigurationValidator(Joi.object({
    hello: Joi.string().required(),
    foo: Joi.string().required()
}))
const parsedConfiguration = await parser.validate(parsedConfiguration)
```
