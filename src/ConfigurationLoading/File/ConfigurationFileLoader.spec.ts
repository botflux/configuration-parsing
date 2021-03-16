import path from 'path'
import {configurationFileLoader, loaderName} from './ConfigurationFileLoader'
import {ConfigurationLoadingError} from '../LoadableConfiguration'
import fs from 'fs'

describe('ConfigurationFileLoader', function () {
    it('should load the configuration', async function () {
        // Arrange
        const loader = configurationFileLoader({
            fileLocation: path.join(process.cwd(), 'testing/some-file.txt')
        })

        // Act
        const fileContent = await loader.load()

        // Assert
        expect(fileContent).toBe('hello world\n')
    })

    it('should reject when the file does not exist', async function () {
        // Arrange
        const loader = configurationFileLoader({
            fileLocation: 'a-file-that-does-not-exists.txt'
        })

        // Act
        const promise = loader.load()

        // Assert
        await expect(promise).rejects.toEqual(new ConfigurationLoadingError(
            `Something went wrong while loading a configuration file. ` +
            `The file at a-file-that-does-not-exists.txt doesn't exist. Are you this is the correct path?`,
            loaderName
        ))
    })

    it('should reject when the file does not allow read', async function () {
        // Arrange
        const dependencies = {
            readFile: fs.promises.readFile,
            access: () => Promise.reject(new Error(``)),
            exists: fs.existsSync
        }
        const absolutePath = path.join(process.cwd(), 'testing/some-file.txt')
        const loader = configurationFileLoader({
            fileLocation: absolutePath
        }, dependencies)

        // Act
        const promise = loader.load()

        // Assert
        await expect(promise).rejects.toEqual(new ConfigurationLoadingError(
            `Something went wrong while loading a configuration file. ` +
            `The file at ${absolutePath} can't be read. Are you the read access was given?`,
            loaderName
        ))
    })

    it('should reject when read file rejects', async function () {
        // Arrange
        const dependencies = {
            readFile: () => Promise.reject(new Error(`Error`)),
            access: () => Promise.resolve(),
            exists: () => true
        }
        const path = 'fake-file.txt'
        const loader = configurationFileLoader({
            fileLocation: path
        }, dependencies)

        // Act
        const promise = loader.load()

        // Assert
        await expect(promise).rejects.toEqual(new ConfigurationLoadingError(
            `Something went wrong while loading a configuration file (fake-file.txt). `,
            loaderName,
            new Error(`Error`)
        ))
    })
})
