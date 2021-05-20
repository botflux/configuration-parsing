import {ComposedConfigurationFactory} from '../Compose'
import {mapLoaderOptions} from './MapLoaderOptionConfigurationFactory'

type MyConfiguration = { hello: string }

class FakeConfigurationFactory implements ComposedConfigurationFactory<MyConfiguration, MyConfiguration>{
    create(options: MyConfiguration): Promise<MyConfiguration> {
        return Promise.resolve(options)
    }
}

describe('configuration loader options can be transformed', function () {
    it('should map configuration loader factory to another type', async function () {
        // Arrange
        type Foo = { foo: string }
        const factory = new FakeConfigurationFactory()
        const newFactory = mapLoaderOptions<MyConfiguration, Foo>(options => ({ hello: options.foo }))<MyConfiguration>(factory)

        // Act
        const configuration = await newFactory.create({ foo: 'world' })

        // Assert
        expect(configuration).toEqual({ hello: 'world' })
    })
})
