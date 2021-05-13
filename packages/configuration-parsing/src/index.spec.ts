import {
    parsers,
    loaders,
    ValidatableConfiguration,
    validators,
    ComposedConfigurationFactory,
    fromLoadable,
    LoadableConfiguration,
    createCacheableConfigurationFactory,
    TimeInterval,
    CacheableConfigurationFactoryOptions,
    ConfigurationValidationError,
    ConfigurationParsingError,
    ConfigurationLoadingError,
    isConfigurationParsingError,
    isConfigurationLoadingError,
    fromParsedLoadable,
    ParsableConfiguration,
    WithValidatableBuildable,
    isConfigurationValidationError,
    ParsedLoadableConfiguration} from './index'
import * as Joi from 'joi'

it('pass', function () {
    parsers.json()
    parsers.yaml()
    parsers.toml()
    parsers.chain([ parsers.json(), parsers.yaml() ])
    loaders.env()
    loaders.file()
    type A = ValidatableConfiguration<undefined>
    validators.joi(Joi.object({}))
    type B = ComposedConfigurationFactory<any, any>
    fromLoadable(loaders.file()).parsingWith(parsers.json()).validatingWith(validators.joi(Joi.object({})))
    type C = LoadableConfiguration<any>
    createCacheableConfigurationFactory(
        fromLoadable(loaders.file()).parsingWith(parsers.json()).validatingWith(validators.joi(Joi.object({})))
    , { reloadEvery: TimeInterval.minutes(2) })

    type D = CacheableConfigurationFactoryOptions
    new ConfigurationLoadingError("", "")
    new ConfigurationValidationError("", "")
    new ConfigurationParsingError("", "")
    isConfigurationValidationError(undefined)
    isConfigurationLoadingError(undefined)
    isConfigurationParsingError(undefined)
    fromParsedLoadable(loaders.env())
    type E = ParsableConfiguration
    type F = WithValidatableBuildable<any, any>
    type G = ParsedLoadableConfiguration<any, any>
})
