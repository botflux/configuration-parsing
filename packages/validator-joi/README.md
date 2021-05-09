# `@configuration-parsing/validator-joi`

A joi validator implementaing the `ValidatableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/validator-joi
```

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
