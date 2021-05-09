# `@configuration-parsing/parser-toml`

A toml parser implementaing the `ParsableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/parser-toml
```

## Usage

```typescript
import { tomlConfigurationParser } from '@configuration-parser/parser-toml'

const tomlConfiguration = `hello = 2`
const parser = tomlConfigurationParser()
const parsedConfiguration = parser.parse()
```
