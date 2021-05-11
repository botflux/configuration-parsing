# `@configuration-parsing/parser-toml`

A toml parser implementing the `ParsableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/parser-toml
```


## Documentation

[https://botlfux.github.io/configuration-parsing](https://botflux.github.io/configuration-parsing)

## Usage

```typescript
import { tomlConfigurationParser } from '@configuration-parser/parser-toml'

const tomlConfiguration = `hello = 2`
const parser = tomlConfigurationParser()
const parsedConfiguration = parser.parse()
```
