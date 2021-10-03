const baseJestConfig = require('../../jest.config')
const packageName = require('./package.json').name.split('@configuration-parsing/').pop()

module.exports = { 
    ...baseJestConfig,
    roots: [
        `<rootDir>/packages/${packageName}`,
    ],
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    moduleDirectories: [
        'node_modules',
    ],
    modulePaths: [
        `<rootDir>/packages/${packageName}/src/`,
    ],
    name: packageName,
    displayName: packageName,
    rootDir: '../..',
}
