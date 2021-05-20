# Augment configuration factories

## Caching configuration

If you want to reload the configuration for each request coming you will slow your application.
To solve that issue you can use a `ComposedConfigurationFactory` implementation:

```typescript
import {fromLoadable, loaders, parsers, validators, createEncapsulationBuilder, TimeInterval, cacheConfigurationFactory} from '@configuration-parsing/core'

const factory = 
    fromLoadable(loaders.file())
        .parsingWith(parsers.json())
        .validatingWith(validators.empty())

const cachedFactory = createEncapsulationBuilder(factory)
    .encapsulate(cacheConfigurationFactory({
        reloadEvery: TimeInterval.minutes(2).and(TimeInterval.seconds(30))
    }))
    .build()

const configuration = await cachedFactory.create({ 
    location: 'my-config.json' 
})
```

## Adapt loader options

```typescript
import {fromLoadable, loaders, parsers, validators, createEncapsulationBuilder, TimeInterval, mapLoaderOptions} from '@configuration-parsing/core'
import {joiConfigurationValidator} from '@configuration-parsing/validator-joi'

type Configuration = { foo: string }

export const customerConfigurationFactory =
    createEncapsulationBuilder(
        fromLoadable<Configuration, FileLoaderOptions>(loaders.file())
            .parsingWith(parsers.json())
            .validatingWith(joiConfigurationValidator(customerConfigurationSchema)
        )
    )
        .encapsulate(mapLoaderOptions(options => ({ fileLocation: `config/${options}.json` })))
        .build()

// will load `config/hello.json`
const configuration = await customerConfigurationFactory.create('hello')
```
