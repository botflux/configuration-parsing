# Installation

Until version `0.3.6` this repository was published as a single package on npmjs: `configuration-parsing`. The issue was that you ended up downloading packages that wouldn't use (e.g if you would parse json, you had to download toml and yaml parser anyway). Version `>0.3.6` are now published as separate packages and maintained as a monorepo.

## Packages

In the `@configuration-parsing/core` package, you will find basic features such as file loader, json parser and an empty validator.
You will also find package-less extensions and functions helping components compositions.

```shell
npm install --save @configuration-parsing/core
```

You can find packages extending the feature of `@configuration-parsing/core` such as:

```shell
npm install --save @configuration-parsing/parser-toml
npm install --save @configuration-parsing/parser-yaml
npm install --save @configuration-parsing/parser-jsonc
npm install --save @configuration-parsing/validator-joi
npm install --save @configuration-parsing/validator-ajv
```

## Available parsers

### Json

Shipped in `@configuration-parsing/core`.

### Toml

[npmjs.com](https://www.npmjs.com/package/@configuration-parsing/parser-toml)

```shell
npm install --save @configuration-parsing/parser-toml
```

### Yaml

[npmjs.com](https://www.npmjs.com/package/@configuration-parsing/parser-yaml)

```shell
npm install --save @configuration-parsing/parser-yaml
```

### Jsonc

[npmjs.com](https://www.npmjs.com/package/@configuration-parsing/parser-jsonc)

```shell
npm install --save @configuration-parsing/parser-jsonc
```

## Available validators

### Joi

[npmjs.com](https://www.npmjs.com/package/@configuration-parsing/validator-joi)

```shell
npm install --save @configuration-parsing/validator-joi
```

### Ajv

[npmjs.com](https://www.npmjs.com/package/@configuration-parsing/validator-ajv)

```shell
npm install --save @configuration-parsing/validator-ajv
```

