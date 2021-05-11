# Getting started

[![Build Status](https://travis-ci.com/botflux/configuration-parsing.svg?branch=main)](https://travis-ci.com/botflux/configuration-parsing)
[![Coverage Status](https://coveralls.io/repos/github/botflux/configuration-parsing/badge.svg?branch=main)](https://coveralls.io/github/botflux/configuration-parsing?branch=main)
[![GitHub issues](https://img.shields.io/github/issues/botflux/configuration-parsing.svg)](https://GitHub.com/botflux/configuration-parsing/issues/)
[![GitHub license](https://img.shields.io/github/license/botflux/configuration-parsing.svg)](https://github.com/botflux/configuration-parsing/blob/main/LICENSE)

## Introduction

`configuration-parsing` helps you loading, parsing, and validating your configuration. This package aims to create a workflow to manage all your application's configuration
no matter what format or source you are using.

## Simple example

For example, you can load, parse and validate a json configuration file as following: 

```typescript
import { fromLoadable, loaders, parsers, FileLoaderOptions } from '@configuration-parsing/core'
import { joiConfigurationValidator } from '@configuration-parsing/validator-joi'
import Joi from 'joi'

type MyAppConfig = { /* fields */ }

const appConfigSchema = Joi.object(/* your schema */)

const configurationFactory = 
    // Load from file system
    fromLoadable<MyAppConfig, FileLoaderOptions>(loaders.file())
        // Parse using JSON.parse
        .parsingWith(parsers.json())
        // Validate with the passed joi schema
        .validatingWith(joiConfigurationValidator(appConfigSchema))

const myConfiguration = await configurationFactory.create({ location: 'path/to/my/config.json' })
```

## Architecture

This package is split in 3 main components:

- __ConfigurationLoading__ is in charge of loading configurations from various place using various protocols.
- __ConfigurationParsing__ is in charge of parsing configurations, each parser know how to parse a specific configuration format.
- __ConfigurationValidation__ is in charge of validating parsed configuration. This component makes sure that the configuration is valid.
