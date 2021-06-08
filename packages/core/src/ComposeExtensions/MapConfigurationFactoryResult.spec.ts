import {ComposedConfigurationFactory} from '../Compose'
import {createEncapsulationBuilder} from './EncapsulationBuilder'
import {mapConfigurationFactoryResult} from './MapConfigurationFactoryResult'

type MyConfigurationOptions = { baseUrl1: string }
type MyConfiguration = { anotherServiceUrl: string }

class FakeConfigurationFactory implements ComposedConfigurationFactory<MyConfiguration, MyConfigurationOptions>{
    create(options: MyConfigurationOptions): Promise<MyConfiguration> {
        return Promise.resolve({ anotherServiceUrl: `${options.baseUrl1}/foo/bar` })
    }
}

describe('transform the value returned by a configuration factory', function () {
    it('should return the factory result encapsulated in another object', async function () {
        // Arrange
        const factory = new FakeConfigurationFactory()

        // Act
        const mappedFactory = createEncapsulationBuilder(factory)
            .encapsulate(mapConfigurationFactoryResult(configuration => ({ myConfiguration: configuration })))
            .build()

        const configuration = await mappedFactory.create({ baseUrl1: 'hello.dev' })

        // Assert
        expect(configuration).toEqual({
            myConfiguration: {
                anotherServiceUrl: 'hello.dev/foo/bar'
            }
        })
    })
})
