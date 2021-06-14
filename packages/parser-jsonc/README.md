# `@configuration-parsing/parser-jsonc`

A toml parser implementing the `ParsableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/parser-jsonc
```


## Documentation

[https://botlfux.github.io/configuration-parsing](https://botflux.github.io/configuration-parsing)

## Usage

```typescript
import { jsoncConfigurationParser } from '@configuration-parser/parser-jsonc'

const jsonc = `{
    // My configuration
    "hello": "world"
}`
const parser = jsoncConfigurationParser()
const parsedConfiguration = parser.parse()
```
