---
home: true
heroImage: null
heroText: Configuration parsing
tagline: Load, parse and validate your configuration
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2021 Victor Mendele
---

## Introduction

`configuration-parsing` helps you loading, parsing, and validating your configuration. This package aims to create a workflow to manage all your application's configuration no matter what format or source you are using.

## Simple usage

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
