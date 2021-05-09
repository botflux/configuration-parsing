const {loaders, parsers, validators, fromLoadable} = require('@configuration-parsing/core')

// Create a configuration factory with a file loader, json parser and no validation.
const configurationFactory = fromLoadable(loaders.file())
    .parsingWith(parsers.json())
    .validatingWith(validators.empty())

// Load the configuration
configurationFactory.create({ fileLocation: 'package.json' })
    .then(configuration => console.log(configuration))
    .catch(error => console.log(error))

