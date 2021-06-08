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

Sometimes you want to simplify your factory loader options. To do so, you can use `mapLoaderOptions`
with a mapping function. For example, you can transform a value representing your current env (prod, dev)
into a file path.

```typescript
import {fromLoadable, loaders, parsers, validators, createEncapsulationBuilder, TimeInterval, mapLoaderOptions, FileLoaderOptions} from '@configuration-parsing/core'
import {joiConfigurationValidator} from '@configuration-parsing/validator-joi'

type Configuration = { foo: string }

export const customerConfigurationFactory =
    createEncapsulationBuilder(
        fromLoadable<Configuration, FileLoaderOptions>(loaders.file())
            .parsingWith(parsers.json())
            .validatingWith(validators.empty()
        )
    )
        .encapsulate(mapLoaderOptions(options => ({ fileLocation: `config/${options}.json` })))
        .build()

// will load `config/dev.json`
const configuration = await customerConfigurationFactory.create('dev')
```

## Adapt configuration factories results

As you can map the loader options, you can also map the factory result. By using `mapConfigurationFactoryResult`
for example transform a config object into an uri.

```typescript
import {fromLoadable, loaders, parsers, validators, createEncapsulationBuilder, TimeInterval, mapConfigurationFactoryResult, FileLoaderOptions} from '@configuration-parsing/core'

type DatabaseConfiguration = {
    host: string,
    user: string,
    password: string,
    port: string
}

export const databaseUriFactory =
    createEncapsulationBuilder(
        fromLoadable<DatabaseConfiguration, FileLoaderOptions>(loaders.file())
            .parsingWith(parsers.json())
            .validatingWith(validators.empty())
    )
        .encapsulate(mapConfigurationFactoryResult(configuration => `my-db://${configuration.user}:${configuration.password}@${configuration.host}:${configuration.port}`))
        .build()

const uri = await databaseUriFactory.create({ fileLocation: 'config/my-db.json' })
```

## Merge multiples configuration factories

You can merge configuration coming from multiples sources. You can use a `MergeBuilder` implementation
to do so. 

```typescript
import {fromLoadable, loaders, parsers, validators, FileLoaderOptions, createMergeBuilder} from '@configuration-parsing/core'

type CacheConfiguration = {
    expiresAfter: number,
    fileLocation: string
}

type AuthConfiguration = {
    login: string
    password: string
    serviceUrl: string
}

const cacheConfigurationFactory = fromLoadable(loaders.file())
    .parsingWith(parsers.json())
    .validatingWith(validators.empty())

const authConfigurationFactory = fromLoadable(loaders.file())
    .parsingWith(parsers.json())
    .validatingWith(validators.empty())

const mergedConfigurationFactory = createMergeBuilder()
    .merge(authConfigurationFactory, {
        mapConfiguration: config => ({ auth: config }),
        mapLoader: (options: { auth: FileLoaderOptions }) => options.auth
    })
    .merge(cacheConfigurationFactory, {
        mapConfiguration: config => ({ cache: config }),
        mapLoader: (options: { cache: FileLoaderOptions }) => options.cache
    })
    .build()

const mergedConfiguration = await mergedConfigurationFactory.create({
    auth: { fileLocation: 'config/auth.json' },
    cache: { fileLocation: 'config/cache.json' }
})
```
