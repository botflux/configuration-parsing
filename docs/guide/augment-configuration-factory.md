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
