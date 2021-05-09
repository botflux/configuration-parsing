# `@configuration-parsing/parser-yaml`

A yaml parser implementaing the `ParsableConfiguration` interface of `@configuration-parsing/core`.

## Install

```shell
npm install @configuration-parsing/parser-yaml
```

## Usage

```typescript
import { yamlConfigurationParser } from '@configuration-parser/parser-yaml'

const yamlConfiguration = `hello: 2`
const parser = yamlConfigurationParser()
const parsedConfiguration = parser.parse()
```
