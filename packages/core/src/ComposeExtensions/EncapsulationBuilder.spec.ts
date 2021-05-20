import {ComposedConfigurationFactory} from '../Compose'
import {mapLoaderOptions} from './MapLoaderOptionConfigurationFactory'
import {createPipeBuilder} from './EncapsulationBuilder'

type MyConfiguration = { hello: string }
type AnotherConfiguration = { foo: string }

class FakeConfigurationFactory implements ComposedConfigurationFactory<MyConfiguration, MyConfiguration>{
    create(options: MyConfiguration): Promise<MyConfiguration> {
        return Promise.resolve(options)
    }
}

describe('encapsulate factory with other factories', function () {
    it('should encapsulate factories', async function () {
        // Arrange
        const factory = new FakeConfigurationFactory()

        // Act
        const encapsulateFactory = createPipeBuilder(factory)
            .pipe(mapLoaderOptions((o: AnotherConfiguration) => ({ hello: o.foo })))
            .build()

        const configuration = await encapsulateFactory.create({ foo: 'world' })

        // Assert
        expect(configuration).toEqual({
            hello: 'world'
        })
    })
})
