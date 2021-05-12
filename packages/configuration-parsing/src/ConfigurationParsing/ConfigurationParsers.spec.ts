import {parsers} from './ConfigurationParsers'

it('pass', function () {
    parsers.json()
    parsers.yaml()
    parsers.toml()
    parsers.chain([ parsers.toml(), parsers.yaml() ])
})
