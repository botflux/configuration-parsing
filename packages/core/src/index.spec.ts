import {
    WithValidatableBuildable,
    ParsableConfiguration,
    loaders,
    fromParsedLoadable,
    isConfigurationParsingError,
    isConfigurationLoadingError,
    isConfigurationValidationError,
    ConfigurationParsingError,
    ConfigurationValidationError,
    ConfigurationLoadingError,
    CacheableConfigurationFactoryOptions,
    TimeInterval,
    createCacheableConfigurationFactory,
    LoadableConfiguration,
    validators,
    parsers,
    fromLoadable,
    ComposedConfigurationFactory,
    ValidatableConfiguration,
    ParsedLoadableConfiguration,
    ProcessEnv,
    FileLoaderOptions
} from './index'

it('pass', function () {
    fromLoadable(loaders.file()).parsingWith(parsers.json()).validatingWith(validators.empty<{ hello: string }>())
    type A = WithValidatableBuildable<any, any>
    type B = ParsableConfiguration
    fromParsedLoadable(loaders.env()).validatingWith(validators.empty())
    isConfigurationValidationError(undefined)
    isConfigurationLoadingError(undefined)
    isConfigurationParsingError(undefined)
    new ConfigurationLoadingError("", "")
    new ConfigurationValidationError(""," ")
    new ConfigurationParsingError("", "")
    createCacheableConfigurationFactory(fromLoadable(loaders.file()).parsingWith(parsers.json()).validatingWith(validators.empty<{ hello: string }>()),
        { reloadEvery: TimeInterval.minutes(2) })

    type C = CacheableConfigurationFactoryOptions
    type D = LoadableConfiguration<any>
    type E = ComposedConfigurationFactory<any, any>
    type F = ParsedLoadableConfiguration<any, any>
    type G = ProcessEnv
    type H = FileLoaderOptions
    type I = ValidatableConfiguration<any>
})
