const { parsers, loaders, fromLoadable } = require('@configuration-parsing/core')
const { joiConfigurationValidator } = require('@configuration-parsing/validator-joi')
const Joi = require('joi')

const configurationSchema = Joi.object({
    foo: Joi.string().required()
})

// Create a configuration factory loading file, parsing json and validating
// with Joi.
const configurationFactory = fromLoadable(loaders.file())
    .parsingWith(parsers.json())
    .validatingWith(joiConfigurationValidator(configurationSchema))

configurationFactory.create({ fileLocation: 'some-random-conf.json' })
    .then(configuration => console.log(configuration))
    .catch(error => console.log(error))