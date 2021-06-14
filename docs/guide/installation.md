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
```

## Available parsers

### Json

Shipped in `@configuration-parsing/core`.

### Toml

[npmjs.org](https://www.npmjs.com/package/@configuration-parsing/parser-toml)

```shell
npm install --save @configuration-parsing/parser-toml
```

### Yaml

[npmjs.org](https://www.npmjs.com/package/@configuration-parsing/parser-yaml)

```shell
npm install --save @configuration-parsing/parser-yaml
```

### Jsonc

[npmjs.org](https://www.npmjs.com/package/@configuration-parsing/parser-jsonc)

```shell
npm install --save @configuration-parsing/parser-jsonc
```
